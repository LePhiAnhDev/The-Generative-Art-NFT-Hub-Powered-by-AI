from diffusers import StableDiffusionPipeline
from torch import autocast
import torch
import os
os.environ['HF_HOME'] = "./cache"


modelid = "prompthero/openjourney"
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load pipeline theo thiết bị
if device == "cuda":
    pipe = StableDiffusionPipeline.from_pretrained(
        modelid,
        torch_dtype=torch.float16,
        safety_checker=None
    )
else:
    # Nếu dùng CPU thì loại bỏ torch_dtype
    pipe = StableDiffusionPipeline.from_pretrained(
        modelid,
        safety_checker=None
    )

pipe.to(device)


def generate_art(num_inference_steps, guidance_scale, width, height, user_prompt):
    """
    Sinh ảnh dựa theo các tham số đầu vào.
    """
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

    try:
        if device == "cuda":
            with autocast(device):
                output = pipe(
                    prompt=base_prompt,
                    negative_prompt=negative_prompt,
                    num_inference_steps=num_inference_steps,
                    guidance_scale=guidance_scale,
                    width=width,
                    height=height
                )
        else:
            output = pipe(
                prompt=base_prompt,
                negative_prompt=negative_prompt,
                num_inference_steps=num_inference_steps,
                guidance_scale=guidance_scale,
                width=width,
                height=height
            )

        return output.images[0]

    except Exception as e:
        raise RuntimeError(f"Error during image generation: {e}")
