# Tên file: generative_video.py
import torch
import numpy as np
import imageio
from PIL import Image
import base64
import io
from diffusers import AnimateDiffPipeline, MotionAdapter, EulerDiscreteScheduler
from huggingface_hub import hf_hub_download
from safetensors.torch import load_file
import os

# Đảm bảo thư mục cache tồn tại
os.makedirs("./cache", exist_ok=True)
os.environ['HF_HOME'] = "./cache"

def generate_video(num_inference_steps, guidance_scale, user_prompt):
    """
    Sinh video dựa theo các tham số đầu vào.
    """
    # Cấu hình thiết bị
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    # Thông tin mô hình
    step = num_inference_steps
    repo = "ByteDance/AnimateDiff-Lightning"
    ckpt = f"animatediff_lightning_{step}step_diffusers.safetensors"
    base = "prompthero/openjourney"

    try:
        # Tải adapter chuyển động
        adapter = MotionAdapter().to(device, dtype)
        adapter.load_state_dict(load_file(hf_hub_download(repo, ckpt), device=device))

        # Tải pipeline chính
        pipe = AnimateDiffPipeline.from_pretrained(base, motion_adapter=adapter, torch_dtype=dtype).to(device)
        pipe.scheduler = EulerDiscreteScheduler.from_config(pipe.scheduler.config, timestep_spacing="trailing", beta_schedule="linear")

        # Tạo base prompt tương tự như cách làm trong generative_art.py
        base_prompt = (
            f"mdjrny-v4 style {user_prompt}, masterpiece, 8k uhd, "
            "ultra-realistic, hyper detailed, volumetric lighting, cinematic composition, "
            "dramatic lighting, ray tracing, subsurface scattering, octane render, unreal engine 5, "
            "trending on artstation, award winning, professional photography, highly detailed, "
            "sharp focus, rich colors, intricate details, elegant, luxurious, ethereal atmosphere, "
            "perfect composition, color grading, post-processing, artistic masterpiece, featured on behance, "
            "featured on artstation, NFT art, digital art"
        )

        negative_prompt = (
            "ugly, deformed, noisy, blurry, low quality, duplicate, mutated, extra limbs, "
            "poorly drawn face, poorly drawn hands, distorted, underexposed, overexposed, "
            "bad art, beginner art, amateur, watermark, signature, text"
        )

        # Tạo animation - sử dụng số frames mặc định
        output = pipe(
            prompt=base_prompt,
            negative_prompt=negative_prompt, 
            guidance_scale=guidance_scale, 
            num_inference_steps=step
        )

        # Kiểm tra kiểu dữ liệu của output.frames
        if isinstance(output.frames, list) and isinstance(output.frames[0], list):
            frames = []
            for frame_list in output.frames:  
                for frame in frame_list:  
                    if isinstance(frame, Image.Image):  
                        frames.append(frame)
                    elif isinstance(frame, torch.Tensor):  
                        frame = (frame.cpu().numpy() * 255).astype("uint8")  
                        frame = Image.fromarray(frame).convert("RGB")
                        frames.append(frame)
        else:
            raise RuntimeError("Lỗi: output.frames không đúng định dạng mong muốn!")

        # Điều chỉnh thời lượng video - 4 frames mỗi giây, tổng 5 giây = 20 frames
        fps = 4  # 4 frames mỗi giây
        num_frames_required = fps * 5  # 5 giây = 20 frames
        
        # Lặp lại khung hình nếu cần thiết để đạt đủ 20 frames
        if len(frames) < num_frames_required:
            factor = (num_frames_required // len(frames)) + 1
            frames = (frames * factor)[:num_frames_required]
        else:
            # Giới hạn số lượng frames nếu nhiều hơn 20
            frames = frames[:num_frames_required]
        
        # Lưu video vào buffer
        video_buffer = io.BytesIO()
        imageio.mimsave(video_buffer, frames, format='mp4', fps=fps)
        video_buffer.seek(0)
        
        # Mã hóa base64
        video_base64 = base64.b64encode(video_buffer.read()).decode('utf-8')
        
        return video_base64

    except Exception as e:
        raise RuntimeError(f"Error during video generation: {e}")