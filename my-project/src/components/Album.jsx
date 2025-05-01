import Askforsomething from '../assets/album_artworks/Asked for Something.jpg';
import Beathingheart from '../assets/album_artworks/Beating Heart counting breaths.jpg';
import Kembali from '../assets/album_artworks/Kembali3.jpg';
import Someone from '../assets/album_artworks/Someone Anyone.png';

import Autum_Flowers_30 from '../assets/audio/Autum Flowers 30.mp3';
import Beating_Heart from '../assets/audio/Beating Heart.mp3';
import Daytime_Shooting_Star from '../assets/audio/Daytime Shooting Star.mp3';
import Do_They_Even_Care from '../assets/audio/Do They Even Care.mp3';
import Dreaming_For from '../assets/audio/Dreaming For.mp3';
import Is_It_There from '../assets/audio/Is It There.mp3';
import Pearl from '../assets/audio/Pearl.mp3';
import Someone_Anyone from '../assets/audio/Someone Anyone.mp3';
import Will_It_be_True from '../assets/audio/Will It be True.mp3';

const Album = [
  {
    image: Someone,
    title: 'Someone Anyone',
    releaseDate: '2024-04-29',
    description:
      'A song about understanding the world around us and the people in it. Someone can be anyone, but not anyone can be someone.',
    audio: Someone_Anyone,
    vinylPrice: 15.99,
    digitalPrice: 6.99,
  },
  {
    image: Beathingheart,
    title: 'Beating Heart, Counting Breaths',
    releaseDate: '2024-05-01',
    description:
      'A meditative rhythm representing the subtle tension between life’s persistence and vulnerability.',
    audio: Beating_Heart,
    vinylPrice: 15.99,
    digitalPrice: 6.99,
  },
  {
    image: Askforsomething,
    title: 'Asked for Something, Given Everything',
    releaseDate: '2024-05-19',
    description:
      'A powerful composition that reflects the unexpected grace in receiving more than what was sought.',
    vinylPrice: 79.99,
    digitalPrice: 43.99,
    audios: [
      { title: "Dreaming For", file: Dreaming_For },
      { title: "Someone Anyone", file: Someone_Anyone },
      { title: "Beating Heart", file: Beating_Heart },
      { title: "Is It There", file: Is_It_There },
      { title: "Pearl", file: Pearl },
      { title: "Autumn Flowers", file: Autum_Flowers_30 },
      { title: "Daytime Shooting Star", file: Daytime_Shooting_Star },
      { title: "Will It Be True", file: Will_It_be_True },
      { title: "Do They Even Care", file: Do_They_Even_Care },
    ]
  },  
  {
    image: Kembali,
    title: 'Kembali',
    releaseDate: '2024-09-29',
    description:
      'Kembali bagi para wisudawan Departemen Teknik Elektro, dan kembali bagi Mahasiswa baru Departemen Teknik Elektro.',
    audio: '/assets/audio/kembali.mp3',
    vinylPrice: 15.99,
    digitalPrice: 6.99,
  },
];

export default Album;
