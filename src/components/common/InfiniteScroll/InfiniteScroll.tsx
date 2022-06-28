import React from "react";
import { useState, useEffect, ReactElement, LegacyRef } from "react";

type Props = {
  block: ReactElement;
  blockProps: any;
  addItemList: () => Promise<void>;
  end: boolean;
  spinner: ReactElement;
};

const InfiniteScroll = ({
  block,
  blockProps,
  addItemList,
  end,
  spinner,
}: Props) => {
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const Spinner = () => {
    return spinner;
  };

  const targetStyle = {
    width: "100%",
    height: "1px",
  };

  const callback = async (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (!target) return;

    if (entry.isIntersecting) {
      setLoading(true);
      await addItemList();
      setLoading(false);
    }
  };

  const observer = new IntersectionObserver(callback, { threshold: 0.4 });

  useEffect(() => {
    if (!target) return;

    observer.observe(target);

    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {blockProps.map((props: any, index: number) => {
        return React.cloneElement(block, { content: props, key: index });
      })}
      {loading && <Spinner />}
      {!end && !loading && (
        <div
          style={targetStyle}
          ref={setTarget as LegacyRef<HTMLDivElement>}
        ></div>
      )}
    </>
  );
};

const DefaultSpinner = () => {
  const spinnerStyle = {
    width: "100%",
    height: "50px",
    textAlign: "center",
  } as React.CSSProperties;

  return <div style={spinnerStyle}>Loading...</div>;
};

InfiniteScroll.defaultProps = {
  spinner: <DefaultSpinner />,
};

export default InfiniteScroll;
