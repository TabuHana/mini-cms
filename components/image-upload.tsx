'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImagePlus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import { removeFile } from '@/server/uploadthing';

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

export const ImageUpload = ({ disabled, onChange, onRemove, value }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (res: any) => {
    onChange(res[0].url);
  };

  const onDelete = async (url: string) => {
    await removeFile(url).then(() => onRemove(url));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='mb-4 flex items-center gap-4'>
        {value.map(url => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onDelete(url)}
                variant='destructive'
                size='sm'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              fill
              className='object-cover'
              alt='Image'
              src={url}
            />
          </div>
        ))}
      </div>
      {/* <Button className='text-white' variant='ghost' asChild> */}
        <UploadDropzone
          endpoint='imageUploader'
          onClientUploadComplete={onUpload}
          disabled={disabled}
        />
      {/* </Button> */}
      {/* <CldUploadWidget
                onUpload={onUpload}
                uploadPreset='cjed5yea'
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            type='button'
                            disabled={disabled}
                            variant='secondary'
                            onClick={onClick}
                        >
                            <ImagePlus className='h-4 w-4 mr-2' />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget> */}
    </>
  );
};
