import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const COLORS = {
  primary: '#6C5F8D',
  primaryDark: '#4B3F6E',
  primaryLight: '#9C8CB9',
  creamBg: '#DCD7D5',
  secondary: '#BA96C1',
  secondaryDark: '#6B39BC',
  secondaryLight: '#C7AFF7',
  accent: '#A68CEE',
  success: '#86B9A1',
  error: '#E57F92',
  creamWhite: '#F2EFE5',
  softBlack: '#333333'
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Hieroglyphic';
    src: url('/hieroglyphic-font.woff2') format('woff2');
    font-display: swap;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: ${COLORS.creamBg};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, ${COLORS.secondary}, ${COLORS.secondaryDark});
    border-radius: 4px;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    background: ${COLORS.creamBg};
    scroll-behavior: smooth;
    font-family: 'Inter', sans-serif;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
    
    &:before {
      font-family: 'Hieroglyphic';
      color: ${COLORS.primaryDark};
      font-size: 2rem;
      text-shadow: 0 0 10px ${COLORS.secondaryLight}4D;
      opacity: 1;
    }
  }

  .slick-prev { left: 20px; }
  .slick-next { right: 20px; }
  .slick-prev:before { content: '𓀀'; }
  .slick-next:before { content: '𓀁'; }

  .slick-slide {
    padding: 0 30px;
    box-sizing: border-box;
  }

  .slick-list {
    margin: 0 -30px;
    overflow: hidden;
  }

  .slick-track {
    display: flex !important;
  }

  .slick-slide > div {
    height: 100%;
  }
`;

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 960,
      settings: { 
        slidesToShow: 2,
        slidesToScroll: 1 
      }
    },
    {
      breakpoint: 640,
      settings: { 
        slidesToShow: 1,
        slidesToScroll: 1 
      }
    }
  ]
};

const flowIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px) rotateZ(-5deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateZ(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const drift = keyframes`
  0% { transform: translateX(0) scale(1); }
  50% { transform: translateX(20px) scale(0.9); }
  100% { transform: translateX(0) scale(1); }
`;

const moveBackground = keyframes`
  0% { transform: translate(-5%, -5%); }
  50% { transform: translate(5%, 5%); }
  100% { transform: translate(-5%, -5%); }
`;

const PetsPage = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(45deg, ${COLORS.creamBg}, ${COLORS.primaryLight});
  position: relative;
  overflow-x: hidden;
  animation: ${css`${flowIn} 1s ease-out`};

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    background-image: url('data:image/svg+xml,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="0" y="15" font-family="Hieroglyphic" font-size="20" fill="${COLORS.primaryDark}15">𓏇𓃛𓅃𓆣𓏇𓃛𓅃𓆣𓏇𓃛𓅃𓆣</text></svg>');
    pointer-events: none;
    z-index: 0;
    animation: ${css`${moveBackground} 40s infinite linear`};
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  position: relative;
  font-family: 'Varela Round', sans-serif;
  text-shadow: 0 0 15px ${COLORS.secondaryLight}4D;
  color: ${COLORS.primaryDark};
  z-index: 2;
  opacity: 0;
  animation: ${css`${flowIn} 0.8s ease-out forwards`};

  &::after {
    content: '𓏇𓃠𓅭𓆓𓃀';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    opacity: 0.3;
    color: ${COLORS.primary};
  }
`;

const PetCard = styled.div`
  background: linear-gradient(45deg, ${COLORS.primaryLight}, ${COLORS.secondaryLight});
  border-radius: 15px;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 400px;
  width: 80px;
  box-shadow: 0 8px 20px ${COLORS.primaryDark}1A;
  margin: 0 15px;
  opacity: 0;
  animation: ${props => css`
    ${flowIn} 0.6s ease-out ${props.$delay || '0'}s forwards
  `};

  &:hover {
    transform: translateY(-3px) rotateX(1deg) rotateY(1deg);
    
    &::before {
      opacity: 0.4;
    }
  }

  &::after {
    content: '${props => props.$icon}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Hieroglyphic';
    font-size: 8rem;
    color: ${COLORS.primaryDark}26;
    animation: ${css`${drift} 20s infinite linear`};
    pointer-events: none;
    z-index: 1;
  }
`;

const PetContent = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PetImage = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 10px;
  background: ${props => `url(${props.src}) center/cover no-repeat`};
  border: 2px solid ${COLORS.accent};
  box-shadow: 0 0 20px ${COLORS.accent}33;
  transition: transform 0.3s ease;
`;

const PetName = styled.h3`
  color: ${COLORS.primaryDark};
  font-size: 1.3rem;
  margin: 0.8rem 0;
  text-align: center;
  font-family: 'Varela Round', sans-serif;
`;

const PetDescription = styled.p`
  color: ${COLORS.primaryDark}CC;
  font-size: 0.85rem;
  line-height: 1.4;
  text-align: center;
  padding: 0 0.8rem;
  max-height: ${props => props.$expanded ? 'none' : '60px'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;


const AdoptButton = styled.button`
  padding: 0.8rem;
  background: linear-gradient(45deg, ${COLORS.secondaryDark}, ${COLORS.secondary});
  border: none;
  border-radius: 8px;
  color: ${COLORS.creamWhite};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${COLORS.creamWhite}30;
  margin-top: 1rem;
  font-size: 0.9rem;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 15px ${COLORS.secondary}4D;
  }
`;

const steps = [
  { icon: '𓀭', title: 'Choose Pet Type', text: 'Explore different animals available for adoption' },
  { icon: '𓋴', title: 'Meet the Animals', text: 'Visit our center to interact with potential pets' },
  { icon: '𓍯', title: 'Home Preparation', text: 'Get guidance on creating a pet-friendly environment' },
  { icon: '𓎟', title: 'Finalize Adoption', text: 'Complete the adoption process and take home your friend' }
];

const AdoptionSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  margin: 4rem 0;
  background: ${COLORS.primaryLight}CC;
  border-radius: 15px;
  position: relative;
  opacity: 0;
  animation: ${css`${flowIn} 0.8s ease-out forwards`};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  padding: 2rem;
  background: ${COLORS.creamWhite}4D;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  opacity: 0;
  animation: ${props => css`
    ${flowIn} 0.6s ease-out ${props.$delay || '0'}s forwards
  `};

  &:hover {
    transform: translateY(-10px);
  }
`;

const StepIcon = styled.div`
  font-family: 'Hieroglyphic';
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${COLORS.accent};
`;

const ExpandableCard = styled.div.attrs(props => ({
  style: {
    maxHeight: props.$expanded ? '600px' : '80px'
  }
}))`
  background: ${COLORS.primaryLight};
  border-radius: 10px;
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0 2px 10px ${COLORS.primaryDark}26;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${COLORS.primaryDark}30;

  h3 {
    color: ${COLORS.primaryDark};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  &:hover {
    box-shadow: 0 4px 15px ${COLORS.primaryDark}33;
  }
`;

const PetThumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: ${props => `url(${props.src}) center/cover no-repeat`};
  border: 2px solid ${COLORS.accent};
  box-shadow: 0 2px 8px ${COLORS.accent}33;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${COLORS.creamWhite}1A;
  border-radius: 8px;
  margin-top: 1rem;

  p {
    margin: 0;
    padding: 0.8rem;
    background: ${COLORS.creamWhite}33;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;

    &::before {
      font-family: 'Hieroglyphic';
      font-size: 1.2rem;
    }
  }

  p:nth-child(1)::before { content: '𓀭'; }
  p:nth-child(2)::before { content: '𓃠'; }
  p:nth-child(3)::before { content: '𓆸'; }
  p:nth-child(4)::before { content: '𓋹'; }
`;

const CatIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-family: 'Hieroglyphic';
  font-size: 3rem;
  color: ${COLORS.accent};
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1000;
  text-shadow: 0 2px 5px ${COLORS.primaryDark}4D;

  &:hover {
    transform: scale(1.1) rotate(-15deg);
  }

  &::before {
    content: '𓃠';
  }
`;

const petTypes = [
  {
    type: 'Cat',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Playful and affectionate feline friends looking for loving homes.',
    icon: '𓃠',
    pattern: '𓃠',
    pets: [
      { 
        name: 'Bastet', 
        age: 2, 
        breed: 'Egyptian Mau', 
        personality: 'Curious and affectionate',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Giza Sanctuary',
        health: 'Vaccinated & Neutered'
      },
      {
        name: 'Sekhmet',
        age: 4,
        breed: 'Abyssinian',
        personality: 'Regal and independent',
        image: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Alexandria Shelter',
        health: 'Vaccinated & Chipped'
      }
    ]
  },
  {
    type: 'Dog',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Loyal and energetic canine pals ready to join your family.',
    icon: '𓃛',
    pattern: '𓃛',
    pets: [
      {
        name: 'Anubis',
        age: 3,
        breed: 'Pharaoh Hound',
        personality: 'Loyal and protective',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Luxor Kennels',
        health: 'Vaccinated & Trained'
      }
    ]
  },
  {
    type: 'Bird',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Colorful feathered friends singing for new nests.',
    icon: '𓅃',
    pattern: '𓅃',
    pets: [
      {
        name: 'Horus',
        age: 1,
        breed: 'African Grey',
        personality: 'Intelligent and talkative',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Memphis Aviary',
        health: 'Vaccinated & Wing-clipped'
      }
    ]
  },
  {
    type: 'Reptile',
    image: 'https://images.unsplash.com/photo-1578632749014-ca7715ff6357?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Unique scaled companions for exotic pet lovers.',
    icon: '𓆣',
    pattern: '𓆣',
    pets: [
      {
        name: 'Sobek',
        age: 5,
        breed: 'Leopard Gecko',
        personality: 'Calm and observant',
        image: 'https://images.unsplash.com/photo-1578632749014-ca7715ff6357?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Thebes Reptile House',
        health: 'Vaccinated & Healthy'
      }
    ]
  }
];

const useScrollAnimation = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !animated) {
        setAnimated(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

  return animated;
};

const PetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
`;

const PetDetailsPage = ({ petType, onBack }) => {
  const [expandedPet, setExpandedPet] = useState(null);
  const currentPets = petTypes.find(t => t.type === petType)?.pets || [];

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={onBack} style={{ 
        background: '#8a4b08',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '2rem'
      }}>
        𓀀 Back
      </button>
      <h2 style={{ color: '#4a2c2a', textAlign: 'center' }}>Available {petType}</h2>
      <PetGrid>
        {currentPets.map((pet, index) => (
          <PetCard 
            key={pet.name}
            $expanded={expandedPet === index}
            onClick={() => setExpandedPet(expandedPet === index ? null : index)}
            $pattern={petTypes.find(t => t.type === petType).pattern}
          >
            <PetContent>
              <PetImage src={pet.image} role="img" aria-label={pet.name} />
              <PetName>{pet.name}</PetName>
              <PetDescription $expanded={expandedPet === index}>
                {pet.personality}
                {expandedPet === index && (
                  <>
                    <p>Age: {pet.age} years</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Location: {pet.location}</p>
                    <p>Health: {pet.health}</p>
                  </>
                )}
              </PetDescription>
              <AdoptButton>
                𓋹 Adopt {pet.name} 𓍯
              </AdoptButton>
            </PetContent>
          </PetCard>
        ))}
      </PetGrid>
    </div>
  );
};

const AvailablePets = () => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <>
      <GlobalStyle />
      <PetsPage>
        <CatIcon title="Sacred Cat of Egypt">𓏇</CatIcon>
        
        {!selectedType ? (
          <>
            <Title>Pets Available for Adoption</Title>
            
            <Slider {...sliderSettings}>
              {petTypes.map((pet, index) => (
                <PetCard 
                  key={pet.type} 
                  $delay={index * 0.3}
                  $icon={pet.icon}
                >
                  <PetContent>
                    <PetImage src={pet.image} role="img" aria-label={pet.type} />
                    <PetName>{pet.type}</PetName>
                    <PetDescription>{pet.description}</PetDescription>
                    <AdoptButton onClick={() => setSelectedType(pet.type)}>
                      𓋹 Adopt a {pet.type} 𓍯
                    </AdoptButton>
                  </PetContent>
                </PetCard>
              ))}
            </Slider>
            <AdoptionSteps>
              {steps.map((step, index) => (
                <StepCard 
                  key={step.title} 
                  $delay={index * 0.3}
                >
                  <StepIcon>{step.icon}</StepIcon>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </StepCard>
              ))}
            </AdoptionSteps> 

            <Title>Why Choose Us ?</Title>
            <div style={{padding: '2rem', textAlign: 'center', color: COLORS.primaryDark}}>
              <p>𓋹 All pets receive complete veterinary checks and vaccinations</p>
              <p>𓍯 Best animal adoption service in Cairo for the past 10 years!</p>
              <p>𓎟 Free access to training workshops and events</p>
              <p>𓆣 Comprehensive care guides included with every adoption</p>
            </div>
          </>
        ) : (
          <PetDetailsPage 
            petType={selectedType} 
            onBack={() => setSelectedType(null)}
          />
        )}
      </PetsPage>
    </>
  );
};
export default AvailablePets;