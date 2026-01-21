// This script can be executed in the browser console to test particle visibility
// Copy and paste it into the browser console when viewing the site

(function() {
  console.log('Particle Visibility Test - Starting');
  
  // Helper to convert hex to RGB
  function hexToRgb(hex) {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    return { r, g, b };
  }
  
  // Calculate luminance for contrast calculation
  function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  
  // Calculate contrast ratio between two colors
  function getContrastRatio(color1, color2) {
    // Convert colors to RGB if they're hex
    if (typeof color1 === 'string' && color1.startsWith('#')) {
      color1 = hexToRgb(color1);
    }
    if (typeof color2 === 'string' && color2.startsWith('#')) {
      color2 = hexToRgb(color2);
    }
    
    // Get luminance values
    const l1 = getLuminance(color1.r, color1.g, color1.b);
    const l2 = getLuminance(color2.r, color2.g, color2.b);
    
    // Calculate contrast ratio
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  while (parent) {
    const style = window.getComputedStyle(parent);
    parentBackgrounds.push({
      element: parent.tagName.toLowerCase() + (parent.id ? `#${parent.id}` : '') + (parent.className ? `.${parent.className.replace(/ /g, '.')}` : ''),
      bgColor: style.backgroundColor,
      bgImage: style.backgroundImage
    });
    parent = parent.parentElement;
  }
  
  console.log('Parent element backgrounds:', parentBackgrounds);
  
  // Check the canvas element inside tsparticles
  const canvas = particlesContainer.querySelector('canvas');
  
  if (canvas) {
    console.log('Canvas found:', {
      width: canvas.width,
      height: canvas.height,
      style: {
        zIndex: window.getComputedStyle(canvas).zIndex,
        position: window.getComputedStyle(canvas).position,
        visibility: window.getComputedStyle(canvas).visibility,
        opacity: window.getComputedStyle(canvas).opacity
      }
    });
    
    // Check if canvas has content
    try {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Check if the canvas has any non-transparent pixels
      let hasVisiblePixels = false;
      for (let i = 0; i < data.length; i += 4) {
        // Check alpha channel
        if (data[i + 3] > 0) {
          hasVisiblePixels = true;
          break;
        }
      }
      
      console.log('Canvas has visible content:', hasVisiblePixels);
    } catch (e) {
      console.error('Error checking canvas content:', e);
    }
  } else {
    console.error('Canvas not found within particles container!');
  }
  
  // Provide some suggestions based on the findings
  console.log('-------- VISIBILITY SUGGESTIONS --------');
  
  if (computedStyle.zIndex && parseInt(computedStyle.zIndex) < 0) {
    console.log('- Particles have a negative z-index which might be causing visibility issues. Try increasing the z-index.');
  }
  
  if (computedStyle.opacity && parseFloat(computedStyle.opacity) < 0.2) {
    console.log('- Particles have very low opacity. Consider increasing it.');
  }
  
  if (parentBackgrounds.length > 0 && parentBackgrounds[0].bgColor !== 'rgba(0, 0, 0, 0)') {
    console.log('- Immediate parent has a background color that might be covering the particles. Check parent styles.');
  }
  
  console.log('Particle Visibility Test - Complete');
})();