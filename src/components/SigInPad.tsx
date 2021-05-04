import SignaturePad from '@/components/SignaturePad';
import React, { useRef } from 'react';

import SigPad from 'signature_pad';

interface PropsTest {
  getFirma: (data: Blob) => void;
}

const SigInPad = (props: PropsTest) => {
  const { getFirma } = props;
  let signature = useRef<SigPad>(null);
  return (
    <SignaturePad
      debounceInterval={1000}
      getFirma={getFirma}
      options={{
        minWidth: 1,
        maxWidth: 1,
        penColor: `rgb(0, 0, 0)`,
      }}
    />
  );
};
export default SigInPad;
