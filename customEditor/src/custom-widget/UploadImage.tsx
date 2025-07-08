import React, { useEffect, useState } from 'react';
import { Octokit } from 'octokit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface ImageToBase64WidgetProps {
  forID: string;
  onChange: (commitDetails: CommitDetails) => void;
}

interface CommitDetails {
  path: string;
  message: string;
  committer: {
    name: string;
    email: string;
  };
  content: string;
  headers: {
    'X-GitHub-Api-Version': string;
  };
}

const ImageToBase64Widget: React.FC<ImageToBase64WidgetProps> = ({ forID, onChange }) => {
  const [base64Image, setBase64Image] = useState<string>('');
  const [userData, setUserData] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    fetchUserData();
  }, [fileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('/user-api/currentUser', {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const jsonData = await response.json();
      setUserData(jsonData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCommit = async () => {
    await fetchUserData();

    const path = `docs/thesis/images/${fileName}`;
    try {
      const content = base64Image.split(',')[1]; // Extract base64 content

      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'niravbhuva99',
        repo: 'cms-thesis-project',
        path: path,
        message: `Add image: ${fileName}`,
        committer: {
          name: userData?.name || 'default-committer',
          email: userData?.email || 'default@example.com',
        },
        content,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('File uploaded successfully!');
      }
    } catch (error: any) {
      console.error('Error committing file:', error);
      toast.error(error.message);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #000', borderRadius: '0.25rem' }}>
      <label
        htmlFor={forID}
        style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}
      >
        Choose an image
      </label>
      <input type="file" id={forID} onChange={handleFileChange} style={{ marginBottom: '1rem' }} />

      <button
        disabled={!fileName}
        onClick={handleCommit}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: fileName ? '#007bff' : '#ccc',
          color: '#fff',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        Upload Image To GitHub
      </button>

      <ToastContainer />
    </div>
  );
};

export default ImageToBase64Widget;
