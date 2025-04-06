import os
import uuid

from django.conf import settings
from django.core.files.storage import Storage
from django.utils.deconstruct import deconstructible
from supabase import Client, create_client


@deconstructible
class SupabaseStorage(Storage):
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
        self.bucket_name = settings.SUPABASE_STORAGE_BUCKET

    def _save(self, name, content):
        # Generate a unique filename
        ext = os.path.splitext(name)[1]
        filename = f"{uuid.uuid4()}{ext}"
        
        # Upload the file to Supabase Storage
        self.supabase.storage.from_(self.bucket_name).upload(
            path=filename,
            file=content,
            file_options={"content-type": content.content_type}
        )
        
        return filename

    def url(self, name):
        # Get the public URL for the file
        return self.supabase.storage.from_(self.bucket_name).get_public_url(name)

    def delete(self, name):
        # Delete the file from Supabase Storage
        self.supabase.storage.from_(self.bucket_name).remove([name])

    def exists(self, name):
        try:
            # Try to get the file metadata
            self.supabase.storage.from_(self.bucket_name).get_public_url(name)
            return True
        except Exception:
            return False

    def get_accessed_time(self, name):
        # Supabase doesn't provide file access times, so we use the current time
        from django.utils import timezone
        return timezone.now()

    def get_created_time(self, name):
        # Supabase doesn't provide file creation times, so we use the current time
        from django.utils import timezone
        return timezone.now()

    def get_modified_time(self, name):
        # Supabase doesn't provide file modification times, so we use the current time
        from django.utils import timezone
        return timezone.now()

    def size(self, name):
        # Supabase doesn't provide a direct way to get file size
        # Returning default size for now
        return 0 