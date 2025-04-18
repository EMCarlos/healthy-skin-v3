const publicUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
export const parseImageUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  //get first element
  const imageName = url?.split("/")?.pop();

  return `${publicUrl}/${imageName}`;
};
