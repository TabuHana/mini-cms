import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='hidden lg:block h-20 w-full border-t-2'>
      <div className='max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='text-sm text-muted-foreground'>minicms &#169; 2024</div>
        <Link
          href='/'
          className='text-sm font-semibold text-muted-foreground hover:text-black transition-colors'
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};
