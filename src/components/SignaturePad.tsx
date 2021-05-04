import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  forwardRef,
} from 'react';
import SigPad, { Options } from 'signature_pad';
import { debounce } from 'throttle-debounce-ts';
import { PointGroup } from 'signature_pad/src/signature_pad';
import { DebounceOptions } from 'throttle-debounce-ts/lib/types/utils';
import { Card, CardActions, Fab } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import { withStyles } from '@material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';

interface SignaturePadProps {
  width?: number;
  height?: number;
  options?: Options;
  redrawOnResize?: boolean;
  debounceInterval: number;
  canvasProps?: any;
  getFirma: (data: Blob) => void;
}

interface Re {
  (...args: any[]): void;

  cancel: () => void;
}

const StyledButton = withStyles({
  root: {
    background: `#4CAF50`,
    color: `white`,
    padding: `0 30px`,
    boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`,
  },
  label: {
    textTransform: `capitalize`,
  },
})(Fab);
const RetryButton = withStyles({
  root: {
    background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    color: `white`,
    padding: `0 30px`,
    boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`,
  },
  label: {
    textTransform: `capitalize`,
  },
})(Fab);

const SignaturePad = (props: SignaturePadProps) => {
  const { getFirma } = props;
  const displayName = `react-signature-pad-wrapper`;
  const defaultProps = {
    redrawOnResize: false,
    debounceInterval: 150,
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasOptions, setCanvasOptions] = useState({
    canvasWidth: 0,
    canvasHeight: 0,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [signaturePad, setSignaturePad] = useState<SigPad>(null);
  let callResizeHandler: (
    options: DebounceOptions | number,
    callback: any,
  ) => void;
  useEffect(() => {
    setCanvasOptions({
      canvasWidth: 0,
      canvasHeight: 0,
    });
    callResizeHandler = debounce(
      props!.debounceInterval,
      handleResize.bind(this),
    );
  }, []);
  /**
   * Create a new signature pad.
   *
   * @param {Object} props
   */

  /**
   * Initialise the signature pad once the canvas element is rendered.
   *
   * @return {void}
   */
  useEffect(() => {
    if (canvasRef) {
      if (!props.width || !props.height) {
        canvasRef!.current!.style.width = `100%`;
      }
      scaleCanvas();

      if (!props.width || !props.height) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener(`resize`, callResizeHandler);
      }
      if (canvasRef.current) {
        const sing = new SigPad(canvasRef.current, props.options);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSignaturePad(sing);
        console.log(signaturePad);
      }
    }
  }, []);

  /**
   * Remove the resize event listener and switch the signature pad off on
   * unmount.
   *
   * @return {void}
   */
  useEffect(() => {
    if (!props.width || !props.height) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener(`resize`, callResizeHandler);
    }
    if (signaturePad) {
      signaturePad!.off();
    }
  }, []);

  /**
   * Get the original signature_pad instance.
   *
   * @return {SignaturePad}
   */
  const getInstance = () => signaturePad;

  /**
   * Get the canvas ref.
   *
   * @return {Object}
   */
  const getCanvas = () => canvasRef;

  /**
   * Set the radius of a single dot.
   *
   * @param {(number|Function)} dotSize
   * @return {void}
   */
  const setDotSize = (dotSize: number) => {
    signaturePad!.dotSize = dotSize;
  };

  /**
   * Get the radius of a single dot.
   *
   * @return {number}
   */
  const getDotSize = (dotSize: number) => signaturePad!.dotSize;

  /**
   * Set the minimum width of a line.
   *
   * @param {number} minWidth
   * @return {void}
   */
  const setMinWidth = (minWidth: number) => {
    signaturePad!.minWidth = minWidth;
  };

  /**
   * Get the minimum width of a line.
   *
   * @return {number}
   */
  const getMinWidth = () => signaturePad!.minWidth;

  /**
   * Get the maximum width of a line.
   *
   * @param {number} maxWidth
   * @return {void}
   */
  const setMaxWidth = (maxWidth: number) => {
    signaturePad!.maxWidth = maxWidth;
  };

  /**
   * Get the maximum width of a line.
   *
   * @return {number}
   */
  const getMaxWidth = () => signaturePad!.maxWidth;

  /**
   * Set the throttle for drawing the next point at most once every x ms.
   *
   * @param {number} throttle
   * @return {void}
   */
  const setThrottle = (throttle: number) => {
    signaturePad!.throttle = throttle;
  };

  /**
   * Get the throttle for drawing the next point at most once every x ms.
   *
   * @return {number}
   */
  const getThrottle = () => signaturePad!.throttle;

  /**
   * Set the color used to clear the background.
   *
   * @param {string} color
   * @return {void}
   */
  const setBackgroundColor = (color: string) => {
    signaturePad!.backgroundColor = color;
  };

  /**
   * Get the color used to clear the background.
   *
   * @return {string}
   */
  const getbackgroundColor = () => signaturePad!.backgroundColor;

  /**
   * Set the color used to draw the lines.
   *
   * @param {string} color
   * @return {void}
   */
  const setPenColor = (color: string) => {
    signaturePad!.penColor = color;
  };

  /**
   * Get the color used to draw the lines.
   *
   * @return {string}
   */
  const getPenColor = () => signaturePad!.penColor;

  /**
   * Set weight used to modify new velocity based on the previous velocity.
   *
   * @param {number} weight
   * @return {void}
   */
  const setVelocityFilterWeight = (weight: number) => {
    signaturePad!.velocityFilterWeight = weight;
  };

  /**
   * Get weight used to modify new velocity based on the previous velocity.
   *
   * @return {number}
   */
  const getVelocityFilterWeight = () => signaturePad!.velocityFilterWeight;

  /**
   * Set callback that will be triggered on stroke begin.
   *
   * @param {Function} fn
   * @return {void}
   */
  const setOnBegin = (fn: (event: MouseEvent | Touch) => void) => {
    if (!(fn && typeof fn === `function`)) {
      throw new Error(`Invalid argument passed to onBegin()`);
    }

    signaturePad!.onBegin = fn;
  };

  /**
   * Set callback that will be triggered on stroke end.
   *
   * @param {Function} fn
   * @return {void}
   */
  const setOnEnd = (fn: (event: MouseEvent | Touch) => void) => {
    if (!(fn && typeof fn === `function`)) {
      throw new Error(`Invalid argument passed to onEnd()`);
    }
    signaturePad!.onEnd = fn;
  };

  /**
   * Determine if the canvas is empty.
   *
   * @return {Boolean}
   */
  const isEmpty = () => signaturePad!.isEmpty();

  /**
   * Clear the canvas.
   *
   * @return {void}
   */
  const clear = () => {
    signaturePad!.clear();
  };

  /**
   * Draw a signature from a data URL.
   *
   * @param {string} base64String
   * @return {void}
   */
  const fromDataURL = (base64String: string) => {
    signaturePad!.fromDataURL(base64String);
  };

  /**
   * Get the signature data as a data URL.
   *
   * @param {string} mime
   * @return {string}
   */
  const toDataURL = (mime: string) => signaturePad!.toDataURL(mime);

  /**
   * Draw a signature from an array of point groups.
   *
   * @param {Array} data
   * @return {void}
   */
  const fromData = (data: PointGroup[]) => {
    signaturePad!.fromData(data);
  };

  /**
   * Get the signature pad data an array of point groups.
   *
   * @return {Array}
   */
  const toData = () => signaturePad!.toData();

  /**
   * Turn the signature pad off.
   *
   * @return {void}
   */
  const off = () => {
    signaturePad!.off();
  };

  /**
   * Turn the signature pad on.
   *
   * @return {void}
   */
  const on = () => {
    signaturePad!.on();
  };

  /**
   * Handle a resize event.
   *
   * @return {void}
   */
  const handleResize = () => {
    scaleCanvas();
  };

  /**
   * Scale the canvas.
   *
   * @return {void}
   */
  const scaleCanvas = () => {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const width = (props.width || canvasRef.current!.offsetWidth) * ratio;
    const height = (props.height || canvasRef.current!.offsetHeight) * ratio;

    // Avoid needlessly setting height/width if dimensions haven't changed
    const { canvasWidth, canvasHeight } = canvasOptions;
    if (width === canvasWidth && height === canvasHeight) return;

    let data = ``;
    if (props.redrawOnResize && signaturePad) {
      data = signaturePad!.toDataURL();
    }

    canvasRef.current!.width = width;
    canvasRef.current!.height = height;

    setCanvasOptions({ canvasWidth: width, canvasHeight: height });

    const ctx = canvasRef.current!.getContext(`2d`);
    ctx!.scale(ratio, ratio);

    if (props.redrawOnResize && signaturePad) {
      signaturePad!.fromDataURL(data);
    } else if (signaturePad) {
      signaturePad!.clear();
    }
  };

  const b64toBlob = (b64Data: any, contentType: any, sliceSize: any) => {
    contentType = contentType || ``;
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  /**
   * Render the signature pad component.
   *
   * @return {ReactElement}
   */
  const { canvasProps } = props;
  return (
    <div>
      <Card style={{ width: `500px` }}>
        <canvas ref={canvasRef} {...canvasProps} />
      </Card>
      <CardActions style={{ justifyContent: `center` }}>
        <RetryButton
          onClick={() => {
            clear();
          }}
        >
          <ReplayIcon />
        </RetryButton>
        <StyledButton
          onClick={() => {
            if (!isEmpty()) {

              const b64 = toDataURL(`image/png`);
              const blob = b64toBlob(
                b64.replace(`data:image/png;base64,`, ``),
                `image/png`,
                512,
              );
              getFirma(blob);
            } else {
              alert('ingrese un firma');
            }
          }}
        >
          <CheckIcon />
        </StyledButton>
      </CardActions>
    </div>
  );
};

export default SignaturePad;
