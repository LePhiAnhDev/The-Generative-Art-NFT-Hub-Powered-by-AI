function toggleAdvancedSettings(event) {
    if (event) event.preventDefault();
    const advancedSettings = document.getElementById('advanced-settings');
    const buttonText = document.getElementById('advancedSettingsText');
    const button = document.querySelector('.show-advanced-btn');

    if (advancedSettings.style.display === 'none') {
        advancedSettings.style.display = 'block';
        buttonText.textContent = 'Hide advanced settings';
        button.classList.add('active');
    } else {
        advancedSettings.style.display = 'none';
        buttonText.textContent = 'Show advanced settings';
        button.classList.remove('active');
    }
}

function toggleProperties(event) {
    if (event) event.preventDefault();
    const propertiesContent = document.getElementById('properties-content');
    const propertiesHeader = document.querySelector('.properties-header');

    if (propertiesContent.style.display === 'none') {
        propertiesContent.style.display = 'block';
        propertiesHeader.setAttribute('aria-expanded', 'true');
    } else {
        propertiesContent.style.display = 'none';
        propertiesHeader.setAttribute('aria-expanded', 'false');
    }
}

function updatePropertiesPreview() {
    const previewProperties = document.querySelector('.preview-properties');
    const propertyRows = document.querySelectorAll('.property-row');

    previewProperties.innerHTML = '';

    propertyRows.forEach(row => {
        const nameInput = row.querySelector('.property-name');
        const valueInput = row.querySelector('.property-value');

        if (nameInput.value.trim() && valueInput.value.trim()) {
            const propertyElement = document.createElement('div');
            propertyElement.className = 'preview-property';
            propertyElement.innerHTML = `
                <div class="property-name">${nameInput.value}</div>
                <div class="property-value">${valueInput.value}</div>
            `;
            previewProperties.appendChild(propertyElement);
        }
    });
}

function addNewRow() {
    // Dùng getElementById vì container dùng id
    const container = document.getElementById('properties-container');
    
    if (!container) {
        console.error('Properties container not found!');
        return;
    }

    const newRow = document.createElement('div');
    newRow.className = 'property-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Property name" class="property-name" oninput="checkAndAddNewRow(this)">
        <input type="text" placeholder="Value" class="property-value" oninput="checkAndAddNewRow(this)">
        <button type="button" class="remove-property" onclick="removeProperty(this)">×</button>
    `;
    container.appendChild(newRow);
}


function checkAndAddNewRow(input, event) {
    if (event) event.preventDefault();
    const row = input.closest('.property-row');
    const nameInput = row.querySelector('.property-name');
    const valueInput = row.querySelector('.property-value');

    updatePropertiesPreview();

    if (row === row.parentElement.lastElementChild &&
        nameInput.value.trim() !== '' &&
        valueInput.value.trim() !== '') {
        addNewRow();
    }
}

function removeProperty(button, event) {
    if (event) event.preventDefault();
    const row = button.closest('.property-row');
    const container = row.parentElement;

    if (container.children.length === 1) {
        const nameInput = row.querySelector('.property-name');
        const valueInput = row.querySelector('.property-value');
        nameInput.value = '';
        valueInput.value = '';
    } else {
        row.remove();
    }

    updatePropertiesPreview();
}

// ... rest of the properties functions ... 