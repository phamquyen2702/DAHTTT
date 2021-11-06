export default function setcookie(cname, cvalue, expire) {
  const d = new Date();
  // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  d.setTime(d.getTime() + expire * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
