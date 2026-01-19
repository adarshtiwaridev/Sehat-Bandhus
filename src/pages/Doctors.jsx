import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DoctorsLowercaseRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/patient/Doctors');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Redirecting to doctors list...
    </div>
  );
}
