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
        className="absolute w-[4.2%] h-[5.1%] bg-white rounded-full top-[5.1%] right-[87.5%]"
      />
    </>
  );
};

export default ScanLight;
