import SignaturePad from '@/components/SignaturePad';
import React, { useRef } from 'react';

import SigPad from 'signature_pad';

const SigInPad = () => {
  let signature = useRef<SigPad>(null);
  return (
    <SignaturePad
      debounceInterval={1000}
      options={{
        minWidth: 1,
        maxWidth: 1,
        penColor: `rgb(0, 0, 0)`,
      }}
    />
  );
};
export default SigInPad;
