import { callout, concepts, p, plate, q, table, type Entry } from './types';

export const analysis: Entry[] = [
  {
    id: 'analysis-character',
    kind: 'analysis',
    title: 'Wiglaf: The Last Loyal Thane',
    kicker: 'Character Analysis',
    subtitle: 'How a minor character carries the moral weight of the poem’s ending.',
    tags: ['Wiglaf', 'loyalty', 'character analysis', 'comitatus'],
    theme: 'beowulf',
    art: 'mead-hall',
    intro:
      'Wiglaf appears only in the final third of Beowulf, yet he is the poem’s answer to its central question: what happens to the warrior code when the hero is gone? This analysis argues that Wiglaf embodies the code at its purest, at the very moment the poem shows it collapsing.',
    sections: [
      {
        heading: 'Thesis',
        blocks: [p('**Wiglaf functions as both the fulfilment and the epitaph of the comitatus ideal**: his loyalty proves the code can still inspire courage, while the cowardice of the other thanes proves it can no longer hold a society together.')],
      },
      {
        heading: 'Evidence and analysis',
        blocks: [
          q('I would rather my body were robed in the same burning blaze as my gold-giver’s body.', 'll. 2651–52, trans. Seamus Heaney'),
          p('Wiglaf’s speech directly invokes the bond between lord and thane. The phrase “gold-giver” reminds the reader that loyalty in this world is reciprocal: Beowulf gave treasure; now Wiglaf gives his life.'),
          callout('Technique', 'The kenning “gold-giver” compresses the whole social contract into one word.'),
        ],
      },
      {
        heading: 'Significance',
        blocks: [p('Wiglaf rebukes the fleeing thanes and predicts the fall of the Geats. He becomes the poem’s voice of judgement, and of grief.')],
      },
    ],
    takeaways: ['Minor characters can carry major thematic weight.', 'Wiglaf shows the code surviving in an individual even as it fails collectively.'],
  },
  {
    id: 'analysis-theme',
    kind: 'analysis',
    title: 'Treasure and the Ethics of Giving',
    kicker: 'Theme Analysis',
    subtitle: 'Gold as the binding force, and the poison, of heroic society.',
    tags: ['treasure', 'generosity', 'theme analysis', 'hoard', 'kingship'],
    theme: 'ember',
    art: 'sun',
    intro: 'Gold glitters on almost every page of Beowulf. This analysis traces how treasure changes meaning: from a symbol of social bonds when given, to a symbol of death when hoarded.',
    sections: [
      {
        heading: 'Thesis',
        blocks: [p('In Beowulf, treasure has no fixed value: **its meaning depends entirely on whether it circulates**. Given, it creates loyalty and memory; hoarded, it becomes a curse.')],
      },
      {
        heading: 'Tracing the motif',
        blocks: [
          table(['Moment', 'Treasure', 'Meaning'], ['Hrothgar rewards Beowulf', 'Gifts of horses, armour and gold', 'Honour and alliance'], ['Heremod’s story', 'Gold withheld', 'Tyranny and isolation'], ['The dragon’s hoard', 'Ancient buried wealth', 'Greed, curse and death'], ['Beowulf’s pyre', 'Treasure buried again', 'Futility; wealth returns to the earth']),
        ],
      },
    ],
    takeaways: ['Tracking a motif across the whole text reveals the theme.'],
  },
  {
    id: 'analysis-compare',
    kind: 'analysis',
    title: 'Beowulf & Gawain: Two Kinds of Courage',
    kicker: 'Comparative Analysis',
    subtitle: 'Public glory versus private integrity across the medieval imagination.',
    tags: ['comparison', 'Gawain', 'Beowulf', 'courage', 'chivalry', 'honour'],
    theme: 'violet',
    art: 'venn',
    intro: 'Separated by roughly four centuries, Beowulf and Sir Gawain and the Green Knight both test a hero against a supernatural challenger. Yet they define courage in almost opposite ways.',
    sections: [
      {
        heading: 'Comparison at a glance',
        blocks: [
          plate('venn', 'Plate V. Overlap and difference: what the heroic and chivalric codes share, and where they part.'),
          table(['', 'Beowulf', 'Gawain'], ['Code', 'Germanic heroic code', 'Christian chivalric code'], ['Courage is…', 'Public, physical, boasted', 'Private, moral, humble'], ['The test', 'Monsters to be defeated', 'A promise to be kept'], ['Failure', 'Death, accepted with honour', 'A small lie, deeply regretted'], ['Ending', 'Funeral and lament', 'Return and confession']),
        ],
      },
      {
        heading: 'Argument',
        blocks: [p('Beowulf asks whether a hero can win glory before death arrives; Gawain asks whether a knight can stay **true** when no one is watching. The shift reflects a culture moving from **shame** (what others see) toward **guilt** (what the self knows).')],
      },
    ],
    takeaways: ['Comparison works best through a focused lens such as courage.', 'Point-by-point structure reveals the deepest contrasts.'],
  },
  {
    id: 'analysis-technique',
    kind: 'analysis',
    title: 'Sound as Meaning in Old English Verse',
    kicker: 'Literary Technique',
    subtitle: 'Alliteration, caesura and the hammer-blow rhythm of battle.',
    tags: ['alliteration', 'caesura', 'technique', 'sound', 'poetry'],
    theme: 'electric',
    art: 'grid',
    intro: 'Old English verse was meant to be heard. This analysis examines how the poem’s sound patterns physically enact the violence and grief they describe.',
    sections: [
      {
        heading: 'Techniques',
        blocks: [
          concepts(['Alliteration', 'Hard consonants such as g, b and d cluster in battle scenes, creating a percussive, striking effect.'], ['Caesura', 'The mid-line pause works like an intake of breath, or a sword drawn back.'], ['Variation', 'One idea restated in several ways, slowing time at important moments.']),
          callout('Read aloud', 'Try reading a battle passage aloud and tapping each stressed syllable. The rhythm mirrors the blows.'),
        ],
      },
    ],
    takeaways: ['Sound devices can enact meaning, not just decorate it.'],
  },
  {
    id: 'analysis-passage',
    kind: 'analysis',
    title: '“Tomorrow, and tomorrow, and tomorrow”',
    kicker: 'Passage Interpretation',
    subtitle: 'A close reading of Macbeth’s despair in Act 5.',
    tags: ['Macbeth', 'soliloquy', 'close reading', 'nihilism', 'passage'],
    theme: 'navy',
    art: 'lens',
    intro: 'On hearing of Lady Macbeth’s death, Macbeth delivers one of the bleakest speeches in English drama. This interpretation moves through it line by line.',
    sections: [
      {
        heading: 'The passage',
        blocks: [q('Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day, to the last syllable of recorded time.', 'Act 5, Scene 5')],
      },
      {
        heading: 'Line-by-line',
        blocks: [
          table(['Phrase', 'Technique', 'Interpretation'], ['“Tomorrow, and tomorrow…”', 'Repetition, monotonous rhythm', 'Time becomes an endless, meaningless march.'], ['“creeps in this petty pace”', 'Alliteration, personification', 'Life crawls; the grand ambition has shrunk to pettiness.'], ['“Life’s but a walking shadow”', 'Metaphor', 'Existence is insubstantial and fleeting.'], ['“a poor player”', 'Theatrical metaphor', 'Life is a performance without meaning, a self-aware irony on stage.']),
        ],
      },
      {
        heading: 'Interpretation',
        blocks: [p('The soliloquy marks Macbeth’s **anagnorisis**, not of guilt but of emptiness. The man who killed to own the future discovers the future is worthless.')],
      },
    ],
    takeaways: ['Close reading moves from word, to technique, to meaning.'],
  },
];
