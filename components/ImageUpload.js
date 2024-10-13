const uploadImage = async () => {
    if (!image) return;

    setLoading(true);
    try {
        const base64Image = await convertToBase64(image); // Ensure this returns a valid base64 string
        const response = await fetch('/api/cloudapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }), // Check this line
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to upload image');
        }

        setUrl(data.url); // Set the uploaded image URL
    } catch (error) {
        console.error('Upload failed:', error);
    } finally {
        setLoading(false);
    }
};
