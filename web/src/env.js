export const apiBackendPath = "/api/backend";

export const getAPIUrl = () => {
  const { protocol, hostname, pathname } = window.location;
  const splitPath = pathname.split('/');
  let { port } = window.location;
  if(hostname.includes('localhost')) {
    port = 3000;
    return `${protocol}//${hostname}:${port}${apiBackendPath}`;
  }else{
    return `${protocol}//${hostname}:${port}${apiBackendPath}`;
  }
};
