import { callout, ol, p, q, table, ul, type Entry } from './types';

export const reflections: Entry[] = [
  {
    id: 'assignment-essay',
    kind: 'reflection',
    title: 'The Hero Who Needed an Audience',
    kicker: 'Written Assignment',
    subtitle: 'Literary essay on heroism and reputation in Beowulf. 1,200 words.',
    date: '2026-10-20',
    status: 'Submitted · A−',
    tags: ['essay', 'assignment', 'Beowulf', 'heroism', 'reputation'],
    theme: 'beowulf',
    art: 'manuscript',
    intro: 'My first major essay of the semester. I argued that Beowulf’s heroism is inseparable from its audience: without witnesses and storytellers, his deeds would be meaningless in the poem’s value system.',
    sections: [
      {
        heading: 'Opening paragraph',
        blocks: [
          p('In the world of Beowulf, a deed that is not remembered might as well not have happened. From the opening lines, which honour kings whose “courage and greatness” survive only because they were sung, the poem makes clear that heroism is not a private virtue but a public performance…'),
        ],
      },
      { heading: 'Teacher feedback', blocks: [callout('Feedback', 'Excellent thesis and confident use of quotation. Push your analysis further in paragraph three: why does the poet emphasise the boast?')] },
    ],
    takeaways: ['A strong thesis carries the whole essay.', 'Next time: deeper analysis of individual word choices.'],
  },
  {
    id: 'reflection-personal',
    kind: 'reflection',
    title: 'On Reading Slowly',
    kicker: 'Personal Reflection',
    subtitle: 'What a thousand-year-old poem taught me about attention.',
    date: '2026-10-02',
    tags: ['reflection', 'reading', 'personal', 'growth'],
    theme: 'blush',
    art: 'book',
    intro: 'I expected Beowulf to be boring. Instead, it taught me to slow down. When we read it aloud, I realised it was written for listening, and listening changed how I understood it.',
    sections: [
      {
        heading: 'Reflection',
        blocks: [
          p('I usually read quickly, skimming for plot. Beowulf does not allow that. The kennings force you to stop and solve them; the digressions make you wonder why they are there. By the third week, I noticed I was reading everything more carefully, even my science textbook.'),
          q('Reading slowly is not reading less. It is reading more of what is there.', 'My journal, week 4'),
        ],
      },
    ],
    takeaways: ['Slowing down reveals layers.', 'Reading aloud changes comprehension.'],
  },
  {
    id: 'activity-mead-hall',
    kind: 'reflection',
    title: 'The Mead-Hall Boast',
    kicker: 'Class Activity',
    subtitle: 'Performing a formal Anglo-Saxon boast in front of the class.',
    date: '2026-09-25',
    tags: ['activity', 'performance', 'boast', 'oral tradition', 'speaking'],
    theme: 'ember',
    art: 'mead-hall',
    intro: 'Each of us wrote and performed a boast in the style of Beowulf, introducing our lineage, our past deeds and the challenge we promised to complete.',
    sections: [
      {
        heading: 'My boast (excerpt)',
        blocks: [q('I am Hani Abbas, child of long-distance runners, finisher of the four-hundred-page novel, slayer of the Sunday-night essay. I vow before this hall to read Macbeth before the term ends, and not the summary.', 'Class performance')],
      },
      { heading: 'What I learned', blocks: [ul('Formal structure makes even humour feel ceremonial.', 'Boasting was a promise, binding the speaker to action.')] },
    ],
    takeaways: ['Performance makes literary conventions tangible.'],
  },
  {
    id: 'response-macbeth',
    kind: 'reflection',
    title: 'Reading Response: Act 1 of Macbeth',
    kicker: 'Reading Response',
    subtitle: 'First impressions of the witches and Lady Macbeth.',
    date: '2026-10-30',
    tags: ['reading response', 'Macbeth', 'witches', 'Lady Macbeth'],
    theme: 'violet',
    art: 'mask',
    intro: 'A short response written after reading Act 1. I focused on how quickly Macbeth moves from loyalty to murderous thought.',
    sections: [
      {
        heading: 'Response',
        blocks: [
          p('What shocked me most is how little the witches actually do. They never tell Macbeth to kill anyone; they simply name a future. Everything after is Macbeth’s own imagination, and that makes him more frightening than any prophecy.'),
          table(['Question I had', 'My answer so far'], ['Are the witches controlling fate?', 'No, they reveal desire.'], ['Is Lady Macbeth the villain?', 'She is the catalyst, not the cause.']),
        ],
      },
    ],
    takeaways: ['Prophecy in Macbeth exposes desire rather than determining fate.'],
  },
  {
    id: 'draft-comparative',
    kind: 'reflection',
    title: 'Essay Draft: Courage Across Centuries',
    kicker: 'Essay Draft',
    subtitle: 'Draft 2 of the comparative essay, with revision notes.',
    date: '2026-11-10',
    status: 'Draft 2 · In revision',
    tags: ['draft', 'comparative essay', 'revision', 'Beowulf', 'Gawain'],
    theme: 'cream',
    art: 'quill',
    intro: 'The working draft of my comparative essay on Beowulf and Sir Gawain. Revision notes from peer review are included below.',
    sections: [
      {
        heading: 'Working thesis',
        blocks: [p('While Beowulf measures courage by the deeds an audience can witness, Sir Gawain and the Green Knight relocates courage inside the conscience, revealing a culture moving from public honour toward private integrity.')],
      },
      {
        heading: 'Revision checklist',
        blocks: [
          ol('Restructure body paragraphs point-by-point instead of by text.', 'Add a quotation for Gawain’s confession scene.', 'Cut the summary in paragraph two.', 'Strengthen the conclusion with a modern connection.'),
        ],
      },
    ],
    takeaways: ['Revision is structural, not just proofreading.'],
  },
  {
    id: 'activity-socratic',
    kind: 'reflection',
    title: 'Socratic Seminar: Is Grendel Evil?',
    kicker: 'Class Activity',
    subtitle: 'A student-led discussion on monstrosity and sympathy.',
    date: '2026-09-18',
    tags: ['seminar', 'discussion', 'Grendel', 'speaking', 'listening'],
    theme: 'moss',
    art: 'eye',
    intro: 'In an inner and outer circle format, we debated whether Grendel is purely evil or a figure of exclusion and loneliness.',
    sections: [
      {
        heading: 'My contribution',
        blocks: [p('I argued that the poem gives Grendel a reason: the noise of joy from a hall he can never enter. This doesn’t excuse his violence, but it makes him a figure of exile, and exile is one of the poem’s deepest fears.')],
      },
      { heading: 'Self-assessment', blocks: [ul('Spoke three times with textual evidence.', 'Built on a classmate’s point about Cain.', 'Goal: ask more open questions next time.')] },
    ],
    takeaways: ['Listening is as important as speaking in discussion.'],
  },
];
