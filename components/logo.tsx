import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='flex items-center gap-x-3'>
      <Image
        src='/logo.svg'
        alt='Logo'
        height={20}
        width={20}
      />
      <h1 className='font-semibold hover:cursor-default'>MiniCMS</h1>
    </div>
  );
};
