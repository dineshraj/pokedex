const ScanLight = ({ loading }: { loading: boolean }) => {
  const scanlightDefaultClass =
    'scan-light absolute w-[10.5%] h-[13.5%] bg-[#08a3de] top-[3.7%] right-[86.6%] rounded-full flex';

  const className = loading
    ? `${scanlightDefaultClass} animate-ping opacity-75`
    : scanlightDefaultClass;

  return (
    <>
      <div data-testid="scan-light" className={className} />
      <div
        data-testid="scan-light-highlight"
      />
    </>
  );
};

export default ScanLight;
