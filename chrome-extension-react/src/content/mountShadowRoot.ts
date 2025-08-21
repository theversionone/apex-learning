export function mountShadowRoot(containerId = 'my-chrome-extension-root'): ShadowRoot {
  const existingHost = document.getElementById(containerId);
  if (existingHost && existingHost.shadowRoot) {
    return existingHost.shadowRoot;
  }
  
  const host = document.createElement('div');
  host.id = containerId;
  host.style.all = 'initial';
  host.style.position = 'fixed';
  host.style.top = '20px';
  host.style.right = '20px';
  host.style.zIndex = '999999';
  
  document.documentElement.appendChild(host);
  const shadow = host.attachShadow({ mode: 'open' });
  
  return shadow;
}