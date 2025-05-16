document.addEventListener("DOMContentLoaded", function () {
  // Upload Area Elements
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("file-input");
  const uploadContent = document.getElementById("upload-content");
  const imagePreview = document.getElementById("image-preview");
  const uploadedImage = document.getElementById("uploaded-image");
  const removeUploadBtn = document.getElementById("remove-upload");
  const previewContainer = document.getElementById("preview-container");

  // Model Preview Elements
  const modelPreview = document.getElementById("model-preview");
  const modelViewer = document.getElementById("preview-3d-model");
  const uploadedModelViewer = document.getElementById("uploaded-model");
  const removeModelBtn = document.getElementById("remove-model");

  // Video Preview Elements
  const videoPreview = document.getElementById("video-preview");
  const uploadedVideo = document.getElementById("uploaded-video");
  const removeVideoUploadBtn = document.getElementById("remove-video-upload");

  // Audio Preview Elements
  const audioPreview = document.getElementById("audio-preview");
  const uploadedAudio = document.getElementById("uploaded-audio");
  const audioCover = document.getElementById("audio-cover");
  const changeCoverBtn = document.getElementById("change-cover");
  const audioCoverInput = document.getElementById("audio-cover-input");
  const removeAudioUploadBtn = document.getElementById("remove-audio-upload");

  // 3D Model Preview Elements
  const threeDPreview = document.getElementById("3d-preview");
  const uploadedModel = document.getElementById("uploaded-3d-model");
  const remove3DUploadBtn = document.getElementById("remove-3d-upload");

  // Model viewer và controls
  const rotateLeftBtn = document.getElementById("rotate-left");
  const rotateRightBtn = document.getElementById("rotate-right");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");

  // Handle image files
  function handleImageFile(file) {
    const url = URL.createObjectURL(file);
    if (uploadedImage) uploadedImage.src = url;
    if (uploadContent) uploadContent.style.display = "none";
    if (imagePreview) imagePreview.style.display = "block";

    // Update preview
    const previewImage = document.getElementById("preview-image");
    if (previewImage) {
      previewImage.src = url;
      previewImage.style.display = "block";
    }
    
    // Hide placeholder
    const previewPlaceholder = document.getElementById("preview-placeholder");
    if (previewPlaceholder) previewPlaceholder.style.display = "none";
  }

  // Handle 3D model files
  function handle3DModelFile(file) {
    const url = URL.createObjectURL(file);
    if (uploadedModelViewer) uploadedModelViewer.src = url;
    if (uploadContent) uploadContent.style.display = "none";
    if (modelPreview) modelPreview.style.display = "block";

    // Update preview section
    const preview3dModel = document.getElementById("preview-3d-model");
    if (preview3dModel) {
      preview3dModel.src = url;
      preview3dModel.style.display = "block";
    }
    
    // Hide placeholder
    const previewPlaceholder = document.getElementById("preview-placeholder");
    if (previewPlaceholder) previewPlaceholder.style.display = "none";
  }

  // Handle video files
  function handleVideoFile(file) {
    const url = URL.createObjectURL(file);
    if (uploadedVideo) uploadedVideo.src = url;
    if (uploadContent) uploadContent.style.display = "none";
    if (videoPreview) videoPreview.style.display = "block";

    // Update preview
    const previewVideo = document.getElementById("preview-video");
    if (previewVideo) {
      previewVideo.src = url;
      previewVideo.style.display = "block";
    }
    
    // Hide placeholder
    const previewPlaceholder = document.getElementById("preview-placeholder");
    if (previewPlaceholder) previewPlaceholder.style.display = "none";
  }

  // Handle audio files
  function handleAudioFile(file) {
    // Show audio preview and hide upload content
    if (uploadContent) uploadContent.style.display = "none";
    if (audioPreview) audioPreview.style.display = "block";
    
    // Update audio element
    if (uploadedAudio) {
      uploadedAudio.src = URL.createObjectURL(file);
      uploadedAudio.onloadeddata = function() {
        // Update NFT preview
        const previewAudioContainer = document.getElementById("preview-audio-container");
        if (previewAudioContainer) {
          previewAudioContainer.style.display = "block";
          const previewAudio = document.getElementById("preview-audio");
          if (previewAudio) previewAudio.src = URL.createObjectURL(file);
        }
      };
    }
    
    // Ensure audio cover SVG is visible and reset to default if needed
    if (audioCover) {
      // If it's an image element that was replaced with SVG, no need to set src
      if (audioCover.tagName.toLowerCase() === 'img') {
        // Create a new SVG element to replace the img
        const svgElement = createAudioPlaceholderSVG();
        audioCover.parentNode.replaceChild(svgElement, audioCover);
      }
    }
    
    // Reset the cover image input
    if (audioCoverInput) {
      audioCoverInput.value = "";
    }
    
    // Update NFT preview cover to default SVG
    const previewAudioCover = document.getElementById("preview-audio-cover");
    if (previewAudioCover) {
      if (previewAudioCover.tagName.toLowerCase() === 'img') {
        // Create a new SVG element to replace the img
        const svgElement = createAudioPlaceholderSVG();
        svgElement.id = "preview-audio-cover";
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "calc(100% - 50px)");
        svgElement.setAttribute("style", "background-color: #f8f9fa; border-radius: 8px 8px 0 0;");
        previewAudioCover.parentNode.replaceChild(svgElement, previewAudioCover);
      }
    }
    
    // Hide placeholder
    const previewPlaceholder = document.getElementById("preview-placeholder");
    if (previewPlaceholder) previewPlaceholder.style.display = "none";
  }

  // Helper function to create audio placeholder SVG
  function createAudioPlaceholderSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.5");
    svg.classList.add("audio-placeholder-svg");
    
    // Create rectangle
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "2");
    rect.setAttribute("y", "6");
    rect.setAttribute("width", "20");
    rect.setAttribute("height", "12");
    rect.setAttribute("rx", "2");
    rect.setAttribute("ry", "2");
    
    // Create outer circle
    const outerCircle = document.createElementNS(svgNS, "circle");
    outerCircle.setAttribute("cx", "12");
    outerCircle.setAttribute("cy", "12");
    outerCircle.setAttribute("r", "4");
    
    // Create inner circle
    const innerCircle = document.createElementNS(svgNS, "circle");
    innerCircle.setAttribute("cx", "12");
    innerCircle.setAttribute("cy", "12");
    innerCircle.setAttribute("r", "1");
    
    // Create lines
    const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "9");
    line1.setAttribute("y1", "12");
    line1.setAttribute("x2", "9");
    line1.setAttribute("y2", "12.01");
    
    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "15");
    line2.setAttribute("y1", "12");
    line2.setAttribute("x2", "15");
    line2.setAttribute("y2", "12.01");
    
    // Create paths
    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute("d", "M6 12h0.01");
    
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("d", "M18 12h0.01");
    
    // Append all elements to SVG
    svg.appendChild(rect);
    svg.appendChild(outerCircle);
    svg.appendChild(innerCircle);
    svg.appendChild(line1);
    svg.appendChild(line2);
    svg.appendChild(path1);
    svg.appendChild(path2);
    
    return svg;
  }

  // Make upload area clickable
  if (uploadArea) {
    uploadArea.addEventListener("click", function (e) {
      if (
        e.target !== removeUploadBtn &&
        !removeUploadBtn.contains(e.target) &&
        e.target !== removeModelBtn &&
        !removeModelBtn.contains(e.target) &&
        e.target !== removeVideoUploadBtn &&
        !removeVideoUploadBtn.contains(e.target) &&
        e.target !== removeAudioUploadBtn &&
        !removeAudioUploadBtn.contains(e.target) &&
        e.target !== changeCoverBtn &&
        !changeCoverBtn.contains(e.target) &&
        e.target !== audioCoverInput &&
        !audioCoverInput.contains(e.target)
      ) {
        fileInput.click();
      }
    });
  }

  // Handle audio cover image change
  if (changeCoverBtn && audioCoverInput) {
    // Ngăn chặn sự kiện click được lan truyền đến uploadArea
    changeCoverBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      e.preventDefault(); // Thêm preventDefault để chắc chắn không có hành động mặc định nào được thực hiện
      audioCoverInput.click();
    });

    audioCoverInput.addEventListener("click", function(e) {
      e.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên uploadArea
    });

    audioCoverInput.addEventListener("change", function(e) {
      e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
      
      const file = e.target.files[0];
      if (!file) return;

      const fileExtension = file.name.split(".").pop().toLowerCase();
      
      if (fileExtension === "png" || fileExtension === "jpg") {
        const url = URL.createObjectURL(file);
        
        // Update audio preview cover - replace SVG with image if needed
        if (audioCover) {
          if (audioCover.tagName.toLowerCase() === 'svg') {
            // Create a new image element to replace the SVG
            const imgElement = document.createElement('img');
            imgElement.id = "audio-cover";
            imgElement.src = url;
            imgElement.alt = "Audio Cover";
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "cover";
            audioCover.parentNode.replaceChild(imgElement, audioCover);
          } else {
            audioCover.src = url;
          }
        }
        
        // Update NFT preview cover
        const previewAudioCover = document.getElementById("preview-audio-cover");
        if (previewAudioCover) {
          if (previewAudioCover.tagName.toLowerCase() === 'svg') {
            // Create a new image element to replace the SVG
            const imgElement = document.createElement('img');
            imgElement.id = "preview-audio-cover";
            imgElement.src = url;
            imgElement.alt = "Audio Cover";
            imgElement.style.width = "100%";
            imgElement.style.height = "calc(100% - 50px)";
            imgElement.style.objectFit = "cover";
            imgElement.style.borderRadius = "8px 8px 0 0";
            previewAudioCover.parentNode.replaceChild(imgElement, previewAudioCover);
          } else {
            previewAudioCover.src = url;
          }
        }
      } else {
        alert("Please select a PNG or JPG image for the audio cover.");
        audioCoverInput.value = "";
      }
    });
  }

  // Handle file selection
  if (fileInput) {
    fileInput.accept = ".png,.jpg,.mp4,.glb,.mp3";
    fileInput.addEventListener("change", async function (e) {
      const file = e.target.files[0];
      if (!file) return;

      // Reset all previews
      if (uploadContent) uploadContent.style.display = "flex";
      if (imagePreview) imagePreview.style.display = "none";
      if (modelPreview) modelPreview.style.display = "none";
      if (videoPreview) videoPreview.style.display = "none";
      if (audioPreview) audioPreview.style.display = "none";
      
      const previewImage = document.getElementById("preview-image");
      const preview3dModel = document.getElementById("preview-3d-model");
      const previewPlaceholder = document.getElementById("preview-placeholder");
      const previewVideo = document.getElementById("preview-video");
      const previewAudioContainer = document.getElementById("preview-audio-container");
      const previewAudio = document.getElementById("preview-audio");
      
      if (previewImage) previewImage.style.display = "none";
      if (preview3dModel) preview3dModel.style.display = "none";
      if (previewPlaceholder) previewPlaceholder.style.display = "block";
      if (previewVideo) previewVideo.style.display = "none";
      if (previewAudioContainer) previewAudioContainer.style.display = "none";

      const fileType = file.type;
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Display preview based on file type
      if (
        fileType.startsWith("image/") ||
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg"
      ) {
        // Images
        handleImageFile(file);
      } else if (fileExtension === "glb" || fileExtension === "gltf") {
        // 3D Models
        handle3DModelFile(file);
      } else if (fileType.startsWith("video/") || fileExtension === "mp4") {
        // Videos
        handleVideoFile(file);
      } else if (fileType === "audio/mpeg" || fileExtension === "mp3") {
        // Audio Files
        handleAudioFile(file);
      } else {
        alert("Unsupported file type. Please upload image, video, audio or 3D model files.");
        fileInput.value = "";
      }
    });
  }

  // Model controls
  if (rotateLeftBtn) {
    rotateLeftBtn.addEventListener("click", () => {
      if (modelViewer) {
        const currentRotation =
          modelViewer.getAttribute("camera-orbit").split(" ")[1] || "0deg";
        const newRotation = parseInt(currentRotation) - 90 + "deg";
        modelViewer.setAttribute("camera-orbit", `0deg ${newRotation} auto`);
      }
    });
  }

  if (rotateRightBtn) {
    rotateRightBtn.addEventListener("click", () => {
      if (modelViewer) {
        const currentRotation =
          modelViewer.getAttribute("camera-orbit").split(" ")[1] || "0deg";
        const newRotation = parseInt(currentRotation) + 90 + "deg";
        modelViewer.setAttribute("camera-orbit", `0deg ${newRotation} auto`);
      }
    });
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      if (modelViewer) {
        const currentOrbit = modelViewer
          .getAttribute("camera-orbit")
          .split(" ");
        const currentZoom = parseFloat(currentOrbit[2]) || 2;
        modelViewer.setAttribute(
          "camera-orbit",
          `${currentOrbit[0]} ${currentOrbit[1]} ${currentZoom * 0.8}`
        );
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      if (modelViewer) {
        const currentOrbit = modelViewer
          .getAttribute("camera-orbit")
          .split(" ");
        const currentZoom = parseFloat(currentOrbit[2]) || 2;
        modelViewer.setAttribute(
          "camera-orbit",
          `${currentOrbit[0]} ${currentOrbit[1]} ${currentZoom * 1.2}`
        );
      }
    });
  }

  // Remove uploaded file
  if (removeUploadBtn) {
    removeUploadBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (fileInput) fileInput.value = "";
      if (uploadContent) uploadContent.style.display = "flex";
      if (imagePreview) imagePreview.style.display = "none";
      if (videoPreview) videoPreview.style.display = "none";
      if (audioPreview) audioPreview.style.display = "none";
      if (threeDPreview) threeDPreview.style.display = "none";
      if (uploadedImage) uploadedImage.src = "";
      if (uploadedVideo) uploadedVideo.src = "";
      if (uploadedAudio) uploadedAudio.src = "";
      if (uploadedModel) uploadedModel.src = "";

      // Reset preview
      const previewImage = document.getElementById("preview-image");
      const previewVideo = document.getElementById("preview-video");
      const previewAudioContainer = document.getElementById("preview-audio-container");
      const previewAudio = document.getElementById("preview-audio");
      const preview3dModel = document.getElementById("preview-3d-model");
      const previewPlaceholder = document.getElementById("preview-placeholder");
      
      if (previewImage) previewImage.style.display = "none";
      if (previewVideo) previewVideo.style.display = "none";
      if (previewAudioContainer) previewAudioContainer.style.display = "none";
      if (previewAudio) previewAudio.src = "";
      if (preview3dModel) preview3dModel.style.display = "none";
      if (previewPlaceholder) previewPlaceholder.style.display = "block";
      if (modelViewer) {
        modelViewer.src = "";
      }
    });
  }

  // Remove model
  if (removeModelBtn) {
    removeModelBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (fileInput) fileInput.value = "";
      if (uploadContent) uploadContent.style.display = "flex";
      if (modelPreview) modelPreview.style.display = "none";
      if (uploadedModel) uploadedModel.src = "";

      // Reset preview
      const preview3dModel = document.getElementById("preview-3d-model");
      const previewPlaceholder = document.getElementById("preview-placeholder");

      if (preview3dModel) preview3dModel.style.display = "none";
      if (previewPlaceholder) previewPlaceholder.style.display = "block";
    });
  }

  // Remove video
  if (removeVideoUploadBtn) {
    removeVideoUploadBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (fileInput) fileInput.value = "";
      if (uploadContent) uploadContent.style.display = "flex";
      if (videoPreview) videoPreview.style.display = "none";
      if (uploadedVideo) uploadedVideo.src = "";

      // Reset preview
      const previewVideo = document.getElementById("preview-video");
      const previewPlaceholder = document.getElementById("preview-placeholder");

      if (previewVideo) previewVideo.style.display = "none";
      if (previewPlaceholder) previewPlaceholder.style.display = "block";
    });
  }

  // Remove audio
  if (removeAudioUploadBtn) {
    removeAudioUploadBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (fileInput) fileInput.value = "";
      if (uploadContent) uploadContent.style.display = "flex";
      if (audioPreview) audioPreview.style.display = "none";
      if (uploadedAudio) uploadedAudio.src = "";
      if (audioCover) {
        // If it's an image element that was replaced with SVG, no need to set src
        if (audioCover.tagName.toLowerCase() === 'img') {
          // Create a new SVG element to replace the img
          const svgElement = createAudioPlaceholderSVG();
          audioCover.parentNode.replaceChild(svgElement, audioCover);
        }
      }

      // Reset preview
      const previewAudioContainer = document.getElementById("preview-audio-container");
      const previewAudio = document.getElementById("preview-audio");
      const previewAudioCover = document.getElementById("preview-audio-cover");
      const previewPlaceholder = document.getElementById("preview-placeholder");

      if (previewAudioContainer) previewAudioContainer.style.display = "none";
      if (previewAudio) previewAudio.src = "";
      if (previewAudioCover) {
        if (previewAudioCover.tagName.toLowerCase() === 'img') {
          // Create a new SVG element to replace the img
          const svgElement = createAudioPlaceholderSVG();
          svgElement.id = "preview-audio-cover";
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "calc(100% - 50px)");
          svgElement.setAttribute("style", "background-color: #f8f9fa; border-radius: 8px 8px 0 0;");
          previewAudioCover.parentNode.replaceChild(svgElement, previewAudioCover);
        }
      }
      if (previewPlaceholder) previewPlaceholder.style.display = "block";
    });
  }

  // Advanced Settings Toggle
  function toggleAdvancedSettings() {
    const advancedSettings = document.getElementById("advanced-settings");
    const showAdvancedBtn = document.querySelector(".show-advanced-btn");

    if (advancedSettings.style.display === "none") {
      advancedSettings.style.display = "block";
      showAdvancedBtn.textContent = "Hide advanced settings";
    } else {
      advancedSettings.style.display = "none";
      showAdvancedBtn.textContent = "Show advanced settings";
    }
  }

  // Properties Toggle
  function toggleProperties() {
    const propertiesContent = document.getElementById("properties-content");
    const arrowIcon = document.querySelector(".arrow-icon");

    if (propertiesContent.style.display === "none") {
      propertiesContent.style.display = "block";
      arrowIcon.style.transform = "rotate(180deg)";
    } else {
      propertiesContent.style.display = "none";
      arrowIcon.style.transform = "rotate(0deg)";
    }
  }

  // Auto add new property row when both inputs are filled
  document
    .getElementById("properties-container")
    .addEventListener("input", function (e) {
      if (
        e.target.classList.contains("property-name") ||
        e.target.classList.contains("property-value")
      ) {
        const row = e.target.closest(".property-row");
        const nameInput = row.querySelector(".property-name");
        const valueInput = row.querySelector(".property-value");

        // Check if this is the last row and both inputs are filled
        if (
          row === row.parentElement.lastElementChild &&
          nameInput.value.trim() !== "" &&
          valueInput.value.trim() !== ""
        ) {
          // Add new row
          const newRow = document.createElement("div");
          newRow.className = "property-row";
          newRow.innerHTML = `
                    <input type="text" placeholder="Property name" class="property-name">
                    <input type="text" placeholder="Value" class="property-value">
                    <button type="button" class="remove-property" onclick="removeProperty(this)">×</button>
                `;
          row.parentElement.appendChild(newRow);
        }

        updatePropertiesPreview();
      }
    });

  // Remove Property and update preview
  function removeProperty(button) {
    const container = document.getElementById("properties-container");
    const rows = container.getElementsByClassName("property-row");

    // Don't remove if it's the only row
    if (rows.length > 1) {
      button.parentElement.remove();
    } else {
      // If it's the last row, just clear the inputs
      const row = button.parentElement;
      row.querySelector(".property-name").value = "";
      row.querySelector(".property-value").value = "";
    }

    updatePropertiesPreview();
  }

  // Update properties preview
  function updatePropertiesPreview() {
    const previewProperties = document.getElementById("preview-properties");
    previewProperties.innerHTML = ""; // Clear existing properties

    const propertyRows = document.querySelectorAll(".property-row");
    propertyRows.forEach((row) => {
      const name = row.querySelector(".property-name").value.trim();
      const value = row.querySelector(".property-value").value.trim();

      if (name && value) {
        const propertyElement = document.createElement("div");
        propertyElement.className = "preview-property";
        propertyElement.innerHTML = `
                    <div class="property-name">${name}</div>
                    <div class="property-value">${value}</div>
                `;
        previewProperties.appendChild(propertyElement);
      }
    });
  }

  // Close NFT Modal
  function closeNFTModal() {
    document.getElementById("modal-backdrop").style.display = "none";
    document.getElementById("nft-info-modal").style.display = "none";
  }

  // Expose functions globally if needed
  window.toggleAdvancedSettings = toggleAdvancedSettings;
  window.toggleProperties = toggleProperties;
  window.removeProperty = removeProperty;
  window.closeNFTModal = closeNFTModal;

  // Khởi tạo tất cả các dropdowns
  var dropdownElementList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="dropdown"]')
  );
  var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });
});

// Wallet Connection Script
window.onload = function () {
  checkWalletConnection();
};

function checkWalletConnection() {
  const savedAddress = localStorage.getItem("walletAddress");
  const userProfile = localStorage.getItem("userProfile");

  if (savedAddress) {
    const shortAddress = `${savedAddress.substring(
      0,
      6
    )}...${savedAddress.substring(savedAddress.length - 4)}`;

    // Ẩn nút connect và hiển thị wallet info
    document.getElementById("connectWalletBtn").style.display = "none";
    document.getElementById("walletInfo").style.display = "block";

    // Kiểm tra và hiển thị username hoặc address
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      const navbarUsername = document.getElementById("navbarUsername");
      const walletAvatar = document.querySelector(".wallet-avatar");

      if (navbarUsername) {
        navbarUsername.textContent = profile.name?.trim() || shortAddress;
      }
      if (walletAvatar && profile.profilePicture) {
        walletAvatar.src = profile.profilePicture;
      }
    } else {
      // Nếu chưa có profile, hiển thị short address
      const navbarUsername = document.getElementById("navbarUsername");
      if (navbarUsername) {
        navbarUsername.textContent = shortAddress;
      }
    }
  } else {
    showConnectButton();
  }
}

function showConnectButton() {
  document.getElementById("connectWalletBtn").style.display = "block";
  document.getElementById("walletInfo").style.display = "none";
}

function disconnectWallet() {
  localStorage.removeItem("walletAddress");
  showConnectButton();
  console.log("Wallet disconnected");
}

async function showNFTModal(result) {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("nft-info-modal");

  // Update modal content
  document.getElementById("modal-nft-name").textContent = result.metadata.name;
  document.getElementById("modal-token-id").textContent = result.tokenId;
  document.getElementById("modal-description").textContent =
    result.metadata.description;
  document.getElementById("modal-file-type").textContent =
    result.fileType || "model/gltf-binary";

  // Handle media preview
  const modalImage = document.getElementById("modal-preview-image");
  const modalModel = document.getElementById("modal-preview-model");
  const modalVideo = document.getElementById("modal-preview-video");
  const modalAudioContainer = document.getElementById("modal-preview-audio-container");
  const modalAudio = document.getElementById("modal-preview-audio");
  
  // Hide all preview elements first
  modalImage.style.display = "none";
  modalModel.style.display = "none";
  modalVideo.style.display = "none";
  modalAudioContainer.style.display = "none";

  // Get file URL from IPFS
  const fileUrl = `https://ipfs.io/ipfs/${result.fileHash.replace("ipfs://", "")}`;
  
  // Determine file type and show appropriate preview
  if (
    result.fileType === "model/gltf-binary" ||
    result.fileType.endsWith(".glb")
  ) {
    // 3D Model
    modalModel.style.display = "block";

    try {
      console.log("Loading 3D model from:", fileUrl);

      // Update source for model
      modalModel.setAttribute("src", fileUrl);

      // Add necessary attributes for model-viewer
      modalModel.setAttribute("camera-controls", "");
      modalModel.setAttribute("auto-rotate", "");
      modalModel.setAttribute("exposure", "1");
      modalModel.setAttribute("shadow-intensity", "1");
    } catch (error) {
      console.error("Error loading 3D model:", error);
      modalImage.style.display = "block";
      modalModel.style.display = "none";
      modalImage.src = "../assets/3d-error-placeholder.png";
    }
  } else if (
    result.fileType === "video/mp4" ||
    result.fileType.endsWith(".mp4") ||
    result.fileType.includes("video")
  ) {
    // Video
    modalVideo.style.display = "block";
    modalVideo.src = fileUrl;
    modalVideo.onloadeddata = () => {
      console.log("Video loaded successfully");
    };
    modalVideo.onerror = (error) => {
      console.error("Error loading video:", error);
      modalImage.style.display = "block";
      modalVideo.style.display = "none";
      modalImage.src = "../assets/video-error-placeholder.png";
    };
  } else if (
    result.fileType === "audio/mpeg" ||
    result.fileType.endsWith(".mp3") ||
    result.fileType.includes("audio")
  ) {
    // Audio
    modalAudioContainer.style.display = "block";
    modalAudio.src = fileUrl;
    
    // If there's a cover image in the metadata, use it
    if (result.metadata.coverImage) {
      const coverUrl = result.metadata.coverImage.replace("ipfs://", "https://ipfs.io/ipfs/");
      // Replace the SVG with an actual image
      const audioContainer = document.querySelector("#modal-preview-audio-container > div");
      if (audioContainer) {
        audioContainer.innerHTML = `<img src="${coverUrl}" alt="Audio Cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px 8px 0 0;">`;
      }
    }
    
    modalAudio.onloadeddata = () => {
      console.log("Audio loaded successfully");
    };
    modalAudio.onerror = (error) => {
      console.error("Error loading audio:", error);
      modalImage.style.display = "block";
      modalAudioContainer.style.display = "none";
      modalImage.src = "../assets/audio-error-placeholder.png";
    };
  } else {
    // Image (default)
    modalImage.style.display = "block";
    modalImage.src = result.metadata.image.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
  }

  // Update transaction details
  const txHashLink = document.getElementById("modal-tx-hash");
  txHashLink.href = `https://explorer.sketchpad-1.forma.art/tx/${result.tx.transactionHash}`;
  txHashLink.textContent = `${result.tx.transactionHash.substring(0, 10)}...`;

  // Update IPFS links
  const ipfsFileLink = document.getElementById("modal-ipfs-file");
  ipfsFileLink.href = `https://ipfs.io/ipfs/${result.fileHash.replace(
    "ipfs://",
    ""
  )}`;

  // Show modal
  modalBackdrop.style.display = "block";
  modal.style.display = "block";

  // Log for debugging
  console.log("Modal content:", {
    name: result.metadata.name,
    tokenId: result.tokenId,
    fileType: result.fileType,
    fileHash: result.fileHash,
    metadata: result.metadata,
  });
}
