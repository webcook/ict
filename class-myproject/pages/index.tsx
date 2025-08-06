import Head from 'next/head';
import styles from '../styles/Gacha.module.scss';
import GachaMachine from '../components/GachaMachine';

export default function Home() {
  return (
    <>
      <Head>
        <title>포켓몬 카드 가챠</title>
      </Head>
      <main className={styles.container}>

        <GachaMachine />
      </main>
    </>
  );
}
