let openedStream;

export const stopStream = async (stream) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (err) {
        console.error(err);
      }
      resolve();
    }, 250);
  });
};

export async function getStream(deviceId) {
  await stopStream(openedStream);
  try {
    openedStream = await navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: { ideal: 1 },
        deviceId: { exact: deviceId },
        height: { ideal: 800 },
        width: { ideal: 800 },
      },
    });

    return openedStream;
  } catch (err) {
    console.error(err);
  }
}
