import React, {useEffect, useRef} from 'react';

function Autofocus({children, ...rest}) {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return(
    <div ref={ref} tabIndex="0" {...rest}>
      {children}
    </div>
  );
}

export default Autofocus;
