import { callout, concepts, ol, p, plate, q, table, type Entry } from './types';

export const literature: Entry[] = [
  {
    id: 'beowulf',
    kind: 'literature',
    title: 'Beowulf',
    kicker: 'Unit I · The Heroic Age',
    subtitle: 'Monsters, mead-halls and the long shadow of fate in the oldest epic in English.',
    tags: ['epic', 'Anglo-Saxon', 'Old English', 'heroism', 'fate', 'Grendel', 'kenning'],
    theme: 'beowulf',
    art: 'mead-hall',
    intro:
      'Composed somewhere between 700 and 1000 CE and surviving in a single fire-scorched manuscript, Beowulf is a poem about what it costs to be remembered. A Geatish warrior crosses the sea to free the Danish king Hrothgar from a monster, fights that monster’s mother beneath a lake, and, fifty years later as a king himself, dies killing a dragon. The poem is less a celebration of heroism than a meditation on its limits.',
    sections: [
      {
        heading: 'Context: a poem between two worlds',
        blocks: [
          p(
            'The poem is set in sixth-century Scandinavia but was written down by a Christian Anglo-Saxon poet. This double vision runs through everything: the characters live by a **pagan warrior code**, while the narrator repeatedly frames events through **Christian providence**. Grendel, for instance, is described as a descendant of Cain.'
          ),
          concepts(
            ['Comitatus', 'The bond between a lord and his thanes: the lord gives treasure and protection; the warriors give loyalty to the death.'],
            ['Wyrd', 'The Old English concept of fate, an impersonal force that shapes every life and cannot be outrun.'],
            ['Wergild', '“Man-price”: compensation paid to a family to settle a killing and prevent a blood feud.'],
            ['Scop', 'The court poet who preserved history, genealogy and heroic deeds through oral performance.']
          ),
          callout(
            'Why it matters',
            'Only one manuscript survives, the Nowell Codex (Cotton Vitellius A.xv), and it was damaged in the Cotton Library fire of 1731. Everything we read passes through that single, scorched witness.'
          ),
        ],
      },
      {
        heading: 'The three battles',
        blocks: [
          p(
            'The poem is built around three monster fights, and critics often read them as stages of a life: youth, maturity and old age. Each fight is harder, each takes place further from human civilisation, and each costs more.'
          ),
          table(
            ['Battle', 'Setting', 'What it reveals'],
            ['Grendel', 'Heorot, the mead-hall', 'Youthful strength; Beowulf fights bare-handed to prove that glory comes from the self.'],
            ['Grendel’s mother', 'An underwater cave', 'The ethics of revenge; human weapons fail and Beowulf survives only with an ancient giant-forged sword.'],
            ['The dragon', 'A barrow beyond the edge of the kingdom', 'Mortality and kingship; the hero wins but dies, and his people are left exposed.']
          ),
          plate('dragon', 'Plate I. The dragon guards a hoard it cannot use: a symbol of treasure, and pride, hoarded rather than shared.'),
        ],
      },
      {
        heading: 'Key quotations',
        blocks: [
          q('Behaviour that’s admired is the path to power among people everywhere.', 'll. 24–25, trans. Seamus Heaney'),
          p(
            'Placed almost at the start, this line works as a thesis for the whole poem: reputation, earned through deeds that others witness and repeat, is the only real currency of power.'
          ),
          q('Fate goes ever as fate must.', 'l. 455, trans. Seamus Heaney'),
          p('Beowulf’s confidence before the fight with Grendel is balanced by acceptance. Courage does not cancel fate; it is how a warrior meets it.'),
          q('It is always better to avenge dear ones than to indulge in mourning.', 'll. 1384–85, trans. Seamus Heaney'),
        ],
      },
      {
        heading: 'Style: how the poem sounds',
        blocks: [
          p(
            'Old English verse is built on **alliteration** rather than rhyme. Each line is split by a **caesura** (a pause) into two half-lines, linked by repeated initial sounds. The poem also packs meaning into **kennings**, compressed metaphors that ask the listener to solve a small riddle.'
          ),
          table(
            ['Kenning', 'Meaning', 'Effect'],
            ['whale-road', 'the sea', 'The sea becomes a path for creatures, vast and alive.'],
            ['bone-house', 'the body', 'The body is a temporary shelter for the soul.'],
            ['battle-light', 'a sword', 'Violence is made beautiful, almost sacred.'],
            ['ring-giver', 'a king', 'Kingship is defined by generosity.']
          ),
        ],
      },
    ],
    takeaways: [
      'Heroism in Beowulf is public: it exists only when deeds are seen, told and remembered.',
      'The poem holds pagan and Christian worldviews in tension rather than resolving them.',
      'The structure of three battles mirrors the arc of a human life.',
      'Kennings and alliteration are not decoration; they carry the poem’s values.',
    ],
  },
  {
    id: 'literary-themes',
    kind: 'literature',
    title: 'Literary Themes',
    kicker: 'Concept Study',
    subtitle: 'The big ideas a text keeps circling back to, and how to argue for them.',
    tags: ['theme', 'motif', 'thesis', 'fate', 'mortality', 'loyalty'],
    theme: 'ember',
    art: 'sun',
    intro:
      'A theme is not a topic. “Fate” is a topic; “human beings can choose how they face a fate they cannot change” is a theme. This unit focused on turning one-word ideas into arguable claims, and tracing them across the semester’s texts.',
    sections: [
      {
        heading: 'Topic vs. theme',
        blocks: [
          p('A useful test: a **theme** is a complete sentence that someone could reasonably disagree with. If it fits on a greeting card, it is probably too vague.'),
          table(
            ['Topic', 'Weak theme', 'Strong theme'],
            ['Heroism', 'Heroes are brave.', 'Beowulf suggests heroism is a performance that needs an audience to exist.'],
            ['Ambition', 'Ambition is bad.', 'Macbeth presents ambition as self-erasing: the more he gains, the less of himself remains.'],
            ['Honour', 'Honour is important.', 'Gawain reveals that honour is measured by private integrity rather than public victory.']
          ),
        ],
      },
      {
        heading: 'Recurring themes this semester',
        blocks: [
          concepts(
            ['Mortality and legacy', 'Characters confront death by trying to build something that outlasts them: a name, a hall, a story.'],
            ['Loyalty and betrayal', 'Bonds between lords and followers are tested, as when only Wiglaf stands with Beowulf against the dragon.'],
            ['Fate vs. free will', 'Texts ask whether outcomes are written in advance, and what responsibility remains if they are.'],
            ['Order vs. chaos', 'Halls, courts and kingdoms are fragile islands of order surrounded by wilderness.']
          ),
        ],
      },
      {
        heading: 'Building a theme statement',
        blocks: [
          ol(
            'Choose a topic the text clearly cares about.',
            'Ask what the text suggests about that topic, not just that it appears.',
            'Identify the evidence: a pattern of images, choices or consequences.',
            'Phrase the idea as a universal claim, then qualify it with the text’s complexity.'
          ),
          callout('Teacher’s note', 'Avoid “the author is saying that…” in your final draft. Let the theme stand as your claim and prove it.'),
        ],
      },
    ],
    takeaways: ['A theme is an arguable, complete idea, not a single word.', 'Strong themes are built from patterns of evidence.', 'The best theme statements leave room for complexity.'],
  },
  {
    id: 'character-analysis',
    kind: 'literature',
    title: 'Character Analysis',
    kicker: 'Method',
    subtitle: 'Reading people on the page: motive, contradiction and change.',
    tags: ['character', 'protagonist', 'foil', 'Wiglaf', 'Unferth', 'characterisation'],
    theme: 'violet',
    art: 'mask',
    intro:
      'Characters are built from choices. This unit practised the STEAL method and looked at how minor figures (Unferth, Wiglaf, Grendel’s mother) sharpen our understanding of Beowulf himself.',
    sections: [
      {
        heading: 'The STEAL method',
        blocks: [
          table(
            ['Letter', 'Evidence of', 'Example from Beowulf'],
            ['S', 'Speech', 'Beowulf’s formal boasts announce his identity and lineage.'],
            ['T', 'Thoughts', 'The aged Beowulf broods before the dragon fight, sensing his death.'],
            ['E', 'Effect on others', 'Hrothgar weeps when Beowulf leaves Denmark.'],
            ['A', 'Actions', 'He fights Grendel without a sword or armour.'],
            ['L', 'Looks', 'The coast-guard notes he is the mightiest man he has seen.']
          ),
        ],
      },
      {
        heading: 'Foils and mirrors',
        blocks: [
          p('A **foil** is a character whose contrast highlights another’s qualities. Beowulf is surrounded by them.'),
          concepts(
            ['Unferth', 'Jealous and boastful but without deeds to back his words. He shows what talk without action looks like.'],
            ['Heremod', 'A cautionary king who hoarded treasure and killed his own companions, the opposite of a ring-giver.'],
            ['Wiglaf', 'The loyal young thane who stands by Beowulf, the future of the warrior code at the moment it fails.']
          ),
          q('Often, for undaunted courage, fate spares the man it has not already marked.', 'll. 572–73, trans. Seamus Heaney'),
        ],
      },
      {
        heading: 'Static, dynamic, round, flat',
        blocks: [
          p('Is Beowulf dynamic? Critics disagree. His values hardly change, but his situation does: the warrior who fought for personal glory becomes a king whose glory endangers his people. That tension is the most interesting place to write from.'),
        ],
      },
    ],
    takeaways: ['Use STEAL to gather balanced evidence.', 'Minor characters often reveal the most about the protagonist.', 'Change can happen in situation and meaning, not just personality.'],
  },
  {
    id: 'symbolism',
    kind: 'literature',
    title: 'Symbolism',
    kicker: 'Close Reading',
    subtitle: 'When an object, place or image carries more meaning than its literal weight.',
    tags: ['symbol', 'Heorot', 'treasure', 'motif', 'imagery', 'sword'],
    theme: 'electric',
    art: 'eye',
    intro:
      'A symbol works on two levels at once. Heorot is a building, but it is also the idea of civilisation itself: warmth, song and order pushed up against the dark. This unit tracked symbols that develop across a whole text.',
    sections: [
      {
        heading: 'Major symbols in Beowulf',
        blocks: [
          concepts(
            ['Heorot', 'The great mead-hall: community, kingship and the fragile light of human order.'],
            ['Treasure & rings', 'Social bonds made visible. Treasure given creates loyalty; treasure hoarded is a kind of death.'],
            ['Swords', 'Lineage and identity. Many swords have names and histories, and they often fail at crucial moments.'],
            ['The mere', 'Grendel’s mother’s lake: the unknown, the unconscious, the world beyond human law.']
          ),
          plate('eye', 'Plate II. Symbols ask the reader to look twice: once at the object, once at the idea it holds.'),
        ],
      },
      {
        heading: 'Symbol, motif, allegory',
        blocks: [
          table(
            ['Term', 'Definition', 'Scale'],
            ['Symbol', 'A concrete thing standing for an abstract idea.', 'One image'],
            ['Motif', 'A recurring element that builds meaning through repetition.', 'A pattern'],
            ['Allegory', 'A whole narrative in which characters and events stand for ideas.', 'The entire work']
          ),
          callout('Writing tip', 'Track a symbol’s changes. A hall that is built, haunted, cleansed and finally prophesied to burn tells a story of its own.'),
        ],
      },
    ],
    takeaways: ['Symbols operate on literal and figurative levels simultaneously.', 'Tracing how a symbol changes is more powerful than naming it.'],
  },
  {
    id: 'plot-structure',
    kind: 'literature',
    title: 'Plot & Narrative Structure',
    kicker: 'Architecture',
    subtitle: 'Exposition, rising action, climax and the art of digression.',
    tags: ['plot', 'Freytag', 'structure', 'digression', 'frame narrative', 'in medias res'],
    theme: 'moss',
    art: 'arc',
    intro:
      'Plot is the arrangement of events, not just the events themselves. Beowulf breaks the neat triangle of Freytag’s pyramid with digressions, flashbacks and embedded songs, and those interruptions turn out to be where much of its meaning lives.',
    sections: [
      {
        heading: 'Freytag’s pyramid',
        blocks: [
          plate('arc', 'Plate III. Freytag’s five-part structure, a model most narratives bend more than they follow.'),
          ol(
            '**Exposition**: setting, characters and the initial situation.',
            '**Rising action**: complications that build tension.',
            '**Climax**: the turning point of highest intensity.',
            '**Falling action**: consequences unfold.',
            '**Resolution / dénouement**: a new equilibrium, or its absence.'
          ),
        ],
      },
      {
        heading: 'Digressions and embedded stories',
        blocks: [
          p('At the celebration after Grendel’s defeat, the scop sings of the **Finnsburg episode**, a tale of feud and betrayal. It seems to interrupt the plot, but it forecasts the violence that will one day consume Heorot. Digressions in Beowulf work as **foreshadowing** and **commentary**.'),
          concepts(
            ['In medias res', 'Beginning in the middle of the action.'],
            ['Frame narrative', 'A story within a story, often used to comment on the main plot.'],
            ['Foreshadowing', 'Hints about events to come, which build dread or anticipation.']
          ),
        ],
      },
    ],
    takeaways: ['Structure is a choice that shapes meaning.', 'Digressions often carry the text’s most important commentary.'],
  },
  {
    id: 'quotations',
    kind: 'literature',
    title: 'Important Quotations',
    kicker: 'Anthology',
    subtitle: 'Lines worth memorising, with notes on why they matter.',
    tags: ['quotes', 'evidence', 'memorisation', 'Macbeth', 'Beowulf', 'Gawain'],
    theme: 'plum',
    art: 'quotes',
    intro:
      'A good quotation is a piece of evidence and a piece of art. This collection gathers the lines from the semester that do the most work in an essay: short, memorable, and rich enough to analyse word by word.',
    sections: [
      {
        heading: 'From Beowulf',
        blocks: [
          q('So. The Spear-Danes in days gone by and the kings who ruled them had courage and greatness.', 'll. 1–2, trans. Seamus Heaney'),
          p('Heaney renders the Old English “Hwæt!” as the conversational “So.”, which casts the reader as an audience gathered around a storyteller.'),
          q('Fate goes ever as fate must.', 'l. 455'),
        ],
      },
      {
        heading: 'From Macbeth',
        blocks: [
          q('Fair is foul, and foul is fair.', 'Act 1, Scene 1'),
          p('The witches’ paradox announces a world where appearances cannot be trusted, a theme that will consume Macbeth.'),
          q('I have no spur to prick the sides of my intent, but only vaulting ambition, which o’erleaps itself.', 'Act 1, Scene 7'),
          p('The horse-riding metaphor imagines ambition as a rider who jumps too eagerly and falls on the other side.'),
        ],
      },
      {
        heading: 'How to embed a quotation',
        blocks: [
          table(
            ['Method', 'Example'],
            ['Lead-in with a colon', 'The witches establish the play’s instability: “Fair is foul, and foul is fair.”'],
            ['Woven into the sentence', 'Macbeth admits his only motive is a “vaulting ambition” that “o’erleaps itself.”'],
            ['Single-word focus', 'The word “vaulting” suggests a reckless leap rather than a steady climb.']
          ),
        ],
      },
    ],
    takeaways: ['Choose short quotations you can analyse closely.', 'Always embed quotations grammatically into your own sentence.'],
  },
  {
    id: 'literary-devices',
    kind: 'literature',
    title: 'Literary Devices',
    kicker: 'Toolkit',
    subtitle: 'The writer’s instruments, from alliteration to zeugma.',
    tags: ['devices', 'alliteration', 'metaphor', 'irony', 'kenning', 'litotes', 'imagery'],
    theme: 'navy',
    art: 'quill',
    intro:
      'Identifying a device is the start of analysis, not the end. Every entry here pairs a definition with an example and, most importantly, an explanation of its effect.',
    sections: [
      {
        heading: 'Sound and structure',
        blocks: [
          table(
            ['Device', 'Definition', 'Example'],
            ['Alliteration', 'Repetition of initial consonant sounds.', '“Grendel’s grim grip”'],
            ['Caesura', 'A pause within a line of poetry.', 'Old English half-lines'],
            ['Anaphora', 'Repetition at the start of successive clauses.', '“We shall fight on the beaches, we shall fight…”'],
            ['Enjambment', 'A sentence running past the end of a line.', 'Creates momentum and surprise']
          ),
        ],
      },
      {
        heading: 'Meaning and figuration',
        blocks: [
          concepts(
            ['Kenning', 'A compound metaphor replacing a noun: “whale-road” for the sea.'],
            ['Litotes', 'Understatement through negation: “not unknown” meaning famous. Common in Old English.'],
            ['Dramatic irony', 'The audience knows something a character does not.'],
            ['Epithet', 'A descriptive phrase attached to a name: “Beowulf, son of Ecgtheow.”'],
            ['Personification', 'Giving human qualities to the non-human.']
          ),
          callout('Formula', 'Device + example + effect + link to theme. Never stop at naming the device.'),
        ],
      },
    ],
    takeaways: ['Always explain the effect of a device.', 'Old English poetry relies heavily on kennings, litotes and alliteration.'],
  },
];
