export default function getAwsErrorCode(e) {
  if (e.payload && e.payload.code) {
    // AWS error propagated through our API
    return e.payload.code;
  }
  if (e.code) {
    // AWS error from SDK
    return e.code;
  }
  return null;
}
