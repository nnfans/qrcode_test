import {
  readBarcodesFromImageData,
  getZXingModule,
  setZXingModuleOverrides,
  type ZXingReadOptions,
} from '@sec-ant/zxing-wasm/reader';

setZXingModuleOverrides({
  locateFile: (path, prefix) => {
    if (path.endsWith('.wasm')) {
      return `/zxing/${path}`;
    }
    return prefix + path;
  },
});

getZXingModule();

export default function read(imageData: ImageData, options: ZXingReadOptions) {
  return readBarcodesFromImageData(imageData, options);
}
