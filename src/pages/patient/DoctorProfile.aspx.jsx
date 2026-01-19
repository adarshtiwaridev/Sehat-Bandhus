import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DoctorProfileAspx() {
  const router = useRouter();

  useEffect(() => {
    // Try to read DoctorId from router query first (SSR hydration may be delayed)
    let id = router?.query?.DoctorId ?? router?.query?.doctorId ?? router?.query?.id;

    // If not available yet, parse window.location.search as a fallback
    if (!id && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      id = params.get('DoctorId') ?? params.get('doctorId') ?? params.get('id');
    }

    if (id) {
      // Redirect to the canonical Next page with the id as a query param
      router.replace(`/patient/DoctorProfile?id=${encodeURIComponent(id)}`);
    } else {
      // If no id present, send users to the doctors listing
      router.replace('/patient/Doctors');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-gray-600">Redirecting to doctor profile...</p>
      </div>
    </div>
  );
}
