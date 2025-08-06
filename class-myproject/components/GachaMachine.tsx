'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/Gacha.module.scss';
import { PokemonCard } from '../types/card';
import { pokemonCards } from '../data/card';

export default function GachaMachine() {
  const [shuffledCards, setShuffledCards] = useState<PokemonCard[]>(pokemonCards);
  const [revealedCard, setRevealedCard] = useState<PokemonCard | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [isSpreading, setIsSpreading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      shuffleCardsTwice();
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  // 셔플 2회
  const shuffleCardsTwice = () => {
    setIsShuffling(true);
    let count = 0;
    const maxCount = 2;
    const interval = setInterval(() => {
      const shuffled = [...pokemonCards].sort(() => 0.5 - Math.random());
      setShuffledCards(shuffled);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        setTimeout(() => {
          setIsShuffling(false);
          // 4. 카드 1장 뽑기
          drawCard();
        }, 200);
      }
    }, 300);
  };

  const drawCard = () => {
    const index = Math.floor(Math.random() * shuffledCards.length);
    setRevealedCard(shuffledCards[index]);
  };

  // 셔플 버튼 제거, 뽑기 버튼 클릭 시 동작
  const handleDraw = () => {
    if (isShuffling || isGathering || isSpreading) return;
    setRevealedCard(null);
    setIsGathering(true);
    // 1. 카드가 중심에 모임
    setTimeout(() => {
      setIsGathering(false);
      setIsSpreading(true);
      // 2. 카드가 펼쳐짐
      setTimeout(() => {
        setIsSpreading(false);
        // 3. 셔플 2회
        shuffleCardsTwice();
      }, 500);
    }, 500);
  };

  return (
    <div className={styles.gachaWrapper}>
      <h1 className={styles.title}>포켓몬 카드 뽑기</h1>
      <button onClick={handleDraw} className={styles.drawButton} disabled={isShuffling || isGathering || isSpreading}>뽑기!</button>
      <div className={styles.cardGridWrapper}>
        {revealedCard && (
          <div className={styles.revealedCardCenter}>
            <h2>🎉 뽑힌 카드</h2>
            <img src={revealedCard.image} alt={revealedCard.name} />
            <p>{revealedCard.name}</p>
          </div>
        )}
        <div className={styles.cardGrid}>
          {shuffledCards.slice(0, 15).map(card => (
            <div
              key={card.id}
              className={
                styles.card +
                (isGathering ? ' ' + styles.gathering : '') +
                (isSpreading ? ' ' + styles.spreading : '') +
                (isShuffling ? ' ' + styles.shuffling : '')
              }
            >
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
