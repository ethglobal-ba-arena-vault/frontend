'use client';

import { useState, useRef } from 'react';
import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Stack,
  Group,
  Box,
  Paper,
  Alert,
} from '@mantine/core';
import { IconAlertCircle, IconPhoto } from '@tabler/icons-react';
import classes from './create.module.css';

export default function CreateCoinPage() {
  const [coinName, setCoinName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a .jpg, .gif, or .png file');
        return;
      }

      // Validate file size (15MB max)
      if (file.size > 15 * 1024 * 1024) {
        alert('File size must be less than 15MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleCreateAgent = () => {
    if (!coinName.trim() || !ticker.trim()) {
      alert('Please fill in agent name and ticker');
      return;
    }
    // TODO: Implement create agent logic
    console.log('Creating agent:', { coinName, ticker, description, socialLinks, imageFile });
  };

  return (
    <Container size="lg" py={80}>
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md" c="white">
            Create Agent
          </Title>
        </div>

        <Paper p="xl" radius="md" bg="dark.7" withBorder>
          <Stack gap="xl">
            <div>
              <Title order={2} mb="xs" c="white">
                Create new agent
              </Title>
              <Title order={4} mb="md" c="dimmed" fw={400}>
                Agent details
              </Title>
              <Alert icon={<IconAlertCircle size={16} />} color="yellow" variant="light" mb="md">
                Choose carefully, these can't be changed once the agent is created
              </Alert>
            </div>

            <Stack gap="md">
              <TextInput
                label="Agent name"
                placeholder="Enter agent name"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
                required
                size="md"
                radius="md"
                styles={{
                  label: { color: 'var(--mantine-color-white)', marginBottom: '8px' },
                  input: { backgroundColor: 'var(--mantine-color-dark-8)', color: 'var(--mantine-color-white)' },
                }}
              />

              <TextInput
                label="Ticker"
                placeholder="Enter ticker symbol"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
                size="md"
                radius="md"
                styles={{
                  label: { color: 'var(--mantine-color-white)', marginBottom: '8px' },
                  input: { backgroundColor: 'var(--mantine-color-dark-8)', color: 'var(--mantine-color-white)' },
                }}
              />

              <Textarea
                label="Description (Optional)"
                placeholder="Enter agent description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="md"
                radius="md"
                minRows={3}
                styles={{
                  label: { color: 'var(--mantine-color-white)', marginBottom: '8px' },
                  input: { backgroundColor: 'var(--mantine-color-dark-8)', color: 'var(--mantine-color-white)' },
                }}
              />

              <TextInput
                label="Add social links (Optional)"
                placeholder="Enter social links"
                value={socialLinks}
                onChange={(e) => setSocialLinks(e.target.value)}
                size="md"
                radius="md"
                styles={{
                  label: { color: 'var(--mantine-color-white)', marginBottom: '8px' },
                  input: { backgroundColor: 'var(--mantine-color-dark-8)', color: 'var(--mantine-color-white)' },
                }}
              />
            </Stack>

            <div>
              <Text size="sm" fw={500} mb="md" c="white">
                Select image to upload
              </Text>
              <Box
                className={classes.dropzone}
                onClick={handleDropzoneClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileChange(file);
                    }
                  }}
                  style={{ display: 'none' }}
                />
                {imagePreview ? (
                  <div className={classes.imagePreview}>
                    <img src={imagePreview} alt="Preview" />
                    <Button
                      variant="subtle"
                      color="red"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      style={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className={classes.dropzoneContent}>
                    <IconPhoto size={48} stroke={1.5} />
                    <Text size="sm" mt="md" c="dimmed">
                      or drag and drop it here
                    </Text>
                  </div>
                )}
              </Box>
              <Text size="xs" c="dimmed" mt="xs">
                File size and type: Image - max 15mb. '.jpg', '.gif' or '.png' recommended
              </Text>
              <Text size="xs" c="dimmed" mt={4}>
                Resolution and aspect ratio: Image - min. 1000x1000px, 1:1 square recommended
              </Text>
            </div>

            <Group justify="flex-end" mt="xl">
              <Button
                size="lg"
                radius="xl"
                onClick={handleCreateAgent}
                disabled={!coinName.trim() || !ticker.trim()}
              >
                Create Agent
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

