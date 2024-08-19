import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Estilos com styled-components
const Container = styled.div`
  display: flex; // Usando Flexbox para centralizar o conteúdo
  flex-direction: column;
  justify-content: center; // Centraliza verticalmente
  align-items: center; // Centraliza horizontalmente
  height: 100vh; // Faz com que o container ocupe toda a altura da tela
  background: #e0f7fa; // Cor de fundo suave (azul claro)
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto; // Garante que o container esteja centralizado horizontalmente
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const DogImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 2px solid #ddd;
`;

const ErrorText = styled.p`
  color: #ff4d4d;
  font-size: 1rem;
  margin-top: 20px;
`;

const DogFetcher: React.FC = () => {
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error('Failed to fetch dog image');
      }

      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <Container>
      <Title>Procura a imagem do cachorro</Title>
      <Button onClick={fetchDogImage} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch New Dog Image'}
      </Button>
      {error && <ErrorText>Error: {error}</ErrorText>}
      {dogImage && (
        <ImageContainer>
          <DogImage src={dogImage} alt="Random Dog" />
        </ImageContainer>
      )}
    </Container>
  );
};

export default DogFetcher;
