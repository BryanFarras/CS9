import AskForSomething from '../assets/album_artworks/Asked for Something.jpg';
import BeatingHeart from '../assets/album_artworks/Beating Heart counting breaths.jpg';
import Kembali from '../assets/album_artworks/Kembali3.jpg';
import Someone from '../assets/album_artworks/Someone Anyone.png';

import AutumFlowers30 from '../assets/audio/Autum Flowers 30.mp3';
import Beating_Heart from '../assets/audio/Beating Heart.mp3';
import DaytimeShootingStar from '../assets/audio/Daytime Shooting Star.mp3';
import DoTheyEvenCare from '../assets/audio/Do They Even Care.mp3';
import DreamingFor from '../assets/audio/Dreaming For.mp3';
import IsItThere from '../assets/audio/Is It There.mp3';
import Pearl from '../assets/audio/Pearl.mp3';
import SomeoneAnyone from '../assets/audio/Someone Anyone.mp3';
import WillItBeTrue from '../assets/audio/Will It be True.mp3';

const Album = [
  {
    image: Someone,
    title: 'Someone Anyone',
    releaseDate: '2024-04-29',
    description:
      'A song about understanding the world around us and the people in it. Someone can be anyone, but not anyone can be someone.',
    audio: SomeoneAnyone,
    vinylPrice: 15.99,
    digitalPrice: 6.99,
  },
  {
    image: BeatingHeart,
    title: 'Beating Heart, Counting Breaths',
    releaseDate: '2024-05-01',
    description:
      'A meditative rhythm representing the subtle tension between life’s persistence and vulnerability.',
    audio: Beating_Heart,
    vinylPrice: 15.99,
    digitalPrice: 6.99,
  },
  {
    image: AskForSomething,
    title: 'Asked for Something, Given Everything',
    releaseDate: '2024-05-19',
    description:
      'A powerful composition that reflects the unexpected grace in receiving more than what was sought.',
    vinylPrice: 79.99,
    digitalPrice: 43.99,
    audios: [
      { title: 'Dreaming For The Past', file: DreamingFor },
      { title: 'Someone Anyone', file: SomeoneAnyone },
      { title: 'Beating Heart, Counting Breaths', file: Beating_Heart },
      { title: 'Wish I Wasn’t There', file: IsItThere },
      { title: 'Complication', file: Pearl },
      { title: 'Autumn Flowers', file: AutumFlowers30 },
      { title: 'Daytime Shooting Stars', file: DaytimeShootingStar },
      { title: 'Worst Imagination', file: WillItBeTrue },
      { title: 'Do They Even Care', file: DoTheyEvenCare },
    ],
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
