import { callout, concepts, ol, p, plate, q, table, ul, type Entry } from './types';

export const language: Entry[] = [
  {
    id: 'grammar',
    kind: 'language',
    title: 'Grammar',
    kicker: 'Foundations',
    subtitle: 'Clauses, agreement and the punctuation that holds them together.',
    tags: ['grammar', 'clauses', 'semicolon', 'agreement', 'modifiers', 'punctuation'],
    theme: 'cream',
    art: 'tree',
    intro:
      'Grammar is not a list of rules to obey but a set of tools for controlling meaning. This semester focused on the errors that most often blur an argument, and on the punctuation marks that let a writer build longer, more precise sentences.',
    sections: [
      {
        heading: 'Independent and dependent clauses',
        blocks: [
          p('An **independent clause** can stand alone as a sentence. A **dependent clause** cannot; it begins with a subordinator such as *because*, *although* or *when*.'),
          plate('tree', 'Plate IV. A sentence diagrammed: the main clause carries the weight; subordinate clauses branch from it.'),
        ],
      },
      {
        heading: 'Common errors',
        blocks: [
          table(
            ['Error', 'Incorrect', 'Correct'],
            ['Comma splice', 'Beowulf was brave, he fought Grendel.', 'Beowulf was brave; he fought Grendel.'],
            ['Dangling modifier', 'Walking into Heorot, the silence was eerie.', 'Walking into Heorot, the warriors found the silence eerie.'],
            ['Agreement', 'Each of the warriors have a sword.', 'Each of the warriors has a sword.'],
            ['Faulty parallelism', 'He liked fighting, boasting and to drink mead.', 'He liked fighting, boasting and drinking mead.']
          ),
        ],
      },
      {
        heading: 'Punctuation for argument',
        blocks: [
          concepts(
            ['Semicolon ;', 'Joins two closely related independent clauses, signalling balance.'],
            ['Colon :', 'Introduces an explanation, list or quotation, a drumroll before the point.'],
            ['Em dash —', 'Creates an abrupt interruption or emphasis, informal but powerful.']
          ),
        ],
      },
    ],
    takeaways: ['Know the difference between independent and dependent clauses.', 'Semicolons join equals; colons introduce.'],
  },
  {
    id: 'vocabulary',
    kind: 'language',
    title: 'Vocabulary',
    kicker: 'Lexicon',
    subtitle: 'Precise words for literary discussion, and the roots that unlock them.',
    tags: ['vocabulary', 'etymology', 'roots', 'academic words', 'diction'],
    theme: 'blush',
    art: 'book',
    intro:
      'Precise vocabulary makes analysis sharper. Instead of saying a character is “sad”, we can say they are “melancholic”, “despondent” or “elegiac”, and each choice says something different.',
    sections: [
      {
        heading: 'Words of the semester',
        blocks: [
          concepts(
            ['Elegiac', 'Expressing sorrow for something lost. The final section of Beowulf is deeply elegiac.'],
            ['Hubris', 'Excessive pride that leads to downfall, from Greek tragedy.'],
            ['Ambivalent', 'Having mixed or contradictory feelings about something.'],
            ['Juxtaposition', 'Placing two contrasting elements side by side for effect.'],
            ['Ephemeral', 'Lasting a very short time; fleeting.'],
            ['Didactic', 'Intended to teach, especially a moral lesson.']
          ),
        ],
      },
      {
        heading: 'Roots and etymology',
        blocks: [
          table(
            ['Root', 'Meaning', 'Words'],
            ['bene-', 'good, well', 'benevolent, benefactor, benediction'],
            ['mal-', 'bad, evil', 'malevolent, malice, malady'],
            ['-cide', 'killing', 'regicide, fratricide, homicide'],
            ['chron-', 'time', 'chronology, anachronism, chronic']
          ),
          callout('Did you know?', 'Many everyday English words come straight from Old English: “mead”, “hall”, “sword”, “king”, “earth” and “wife” all appear in Beowulf.'),
        ],
      },
    ],
    takeaways: ['Precise words create precise arguments.', 'Learning roots unlocks dozens of words at once.'],
  },
  {
    id: 'sentence-structures',
    kind: 'language',
    title: 'Sentence Structures',
    kicker: 'Syntax',
    subtitle: 'Simple, compound, complex and the rhythm of variety.',
    tags: ['syntax', 'sentence variety', 'periodic sentence', 'loose sentence', 'rhythm'],
    theme: 'electric',
    art: 'grid',
    intro:
      'Syntax is the music of prose. A short sentence lands like a blow. A long sentence, unfolding clause by clause, can carry the reader through doubt, qualification and discovery before it finally arrives at its point.',
    sections: [
      {
        heading: 'The four types',
        blocks: [
          table(
            ['Type', 'Structure', 'Example'],
            ['Simple', 'One independent clause', 'Grendel attacked.'],
            ['Compound', 'Two independent clauses', 'Grendel attacked, and the Danes fled.'],
            ['Complex', 'Independent + dependent', 'When night fell, Grendel attacked.'],
            ['Compound-complex', 'Two independent + one dependent', 'When night fell, Grendel attacked, and the Danes fled.']
          ),
        ],
      },
      {
        heading: 'Loose vs. periodic',
        blocks: [
          concepts(
            ['Loose sentence', 'Main clause first, details after. Feels natural and conversational.'],
            ['Periodic sentence', 'Details first, main clause last. Builds suspense toward the point.']
          ),
          q('Through the dark hall, past the sleeping warriors, beneath the gables gleaming with gold, came Grendel.', 'Class example of a periodic sentence'),
        ],
      },
    ],
    takeaways: ['Vary sentence length to control pace.', 'Periodic sentences build suspense; loose ones feel natural.'],
  },
  {
    id: 'writing-techniques',
    kind: 'language',
    title: 'Writing Techniques',
    kicker: 'Craft',
    subtitle: 'Show, don’t tell, and other habits of strong writers.',
    tags: ['craft', 'imagery', 'show dont tell', 'voice', 'concision', 'revision'],
    theme: 'ember',
    art: 'quill',
    intro: 'Good writing is mostly rewriting. These techniques came out of workshop sessions, where we revised each other’s paragraphs line by line.',
    sections: [
      {
        heading: 'Show, don’t tell',
        blocks: [
          table(
            ['Telling', 'Showing'],
            ['The hall was scary at night.', 'At night the hall breathed cold; benches stood empty, and no one spoke above a whisper.'],
            ['She was nervous before the exam.', 'She reread the same line four times, the pen clicking under her thumb.']
          ),
        ],
      },
      {
        heading: 'Concision',
        blocks: [
          ul('Cut “very”, “really” and “quite”; choose a stronger word instead.', 'Replace “in order to” with “to”.', 'Turn hidden verbs back into verbs: “made a decision” becomes “decided”.', 'Delete throat-clearing openers: “It is interesting to note that…”'),
          callout('Workshop rule', 'If a sentence still works when a word is removed, remove it.'),
        ],
      },
    ],
    takeaways: ['Specific sensory detail is more persuasive than abstract labels.', 'Revision is where writing gets good.'],
  },
  {
    id: 'essay-writing',
    kind: 'language',
    title: 'Essay Writing',
    kicker: 'Argument',
    subtitle: 'From thesis to conclusion: the architecture of a literary essay.',
    tags: ['essay', 'thesis', 'PEEL', 'paragraph', 'introduction', 'conclusion'],
    theme: 'navy',
    art: 'compass',
    intro:
      'A literary essay is an argument about meaning. It needs a clear claim, convincing evidence and analysis that explains how the evidence proves the claim. This unit broke the essay into parts we could practise individually.',
    sections: [
      {
        heading: 'The thesis statement',
        blocks: [
          p('A thesis must be **arguable**, **specific** and **significant**. It answers the question “so what?”'),
          table(
            ['Weak', 'Strong'],
            ['Beowulf is about a hero.', 'Beowulf presents heroism as a social contract, valuable only so long as it protects the community.'],
            ['Macbeth shows ambition.', 'Macbeth suggests that unchecked ambition destroys not only its victims but the identity of the ambitious.']
          ),
        ],
      },
      {
        heading: 'The PEEL paragraph',
        blocks: [
          ol('**Point**: a topic sentence that supports the thesis.', '**Evidence**: an embedded quotation or specific reference.', '**Explanation**: close analysis of language, form and effect.', '**Link**: connect back to the thesis and forward to the next idea.'),
        ],
      },
      {
        heading: 'Introductions and conclusions',
        blocks: [
          concepts(
            ['Hook', 'An opening that earns attention: a striking quotation, a question or a bold claim.'],
            ['Context', 'Author, text and the essential background, in one or two sentences.'],
            ['Thesis', 'The final sentence of the introduction, your argument stated clearly.'],
            ['Conclusion', 'Synthesise rather than repeat. End on a wider implication.']
          ),
        ],
      },
    ],
    takeaways: ['A thesis must be arguable.', 'PEEL keeps paragraphs focused.', 'Conclusions should widen the lens, not repeat the introduction.'],
  },
  {
    id: 'rhetorical-devices',
    kind: 'language',
    title: 'Rhetorical Devices',
    kicker: 'Persuasion',
    subtitle: 'Ethos, pathos, logos and the art of moving an audience.',
    tags: ['rhetoric', 'ethos', 'pathos', 'logos', 'speech', 'persuasion', 'kairos'],
    theme: 'violet',
    art: 'wave',
    intro:
      'Rhetoric is the study of persuasion. We analysed speeches from Beowulf’s boasts to modern addresses, and found the same strategies at work across a thousand years.',
    sections: [
      {
        heading: 'The rhetorical triangle',
        blocks: [
          concepts(
            ['Ethos', 'Credibility: the speaker’s character and authority.'],
            ['Pathos', 'Emotion: appeals to the audience’s feelings and values.'],
            ['Logos', 'Logic: evidence, reasoning and facts.'],
            ['Kairos', 'Timing: the right argument at the right moment.']
          ),
          p('Beowulf’s speech to Hrothgar is a masterclass in **ethos**: he lists his lineage and past deeds before asking for the right to fight.'),
        ],
      },
      {
        heading: 'Devices of persuasion',
        blocks: [
          table(
            ['Device', 'Effect'],
            ['Rhetorical question', 'Invites the audience to reach the speaker’s conclusion themselves.'],
            ['Tricolon', 'Three parallel elements create rhythm and completeness.'],
            ['Antithesis', 'Contrasting ideas in parallel structure sharpen a point.'],
            ['Hyperbole', 'Exaggeration that heightens emotion or emphasis.']
          ),
        ],
      },
    ],
    takeaways: ['Every persuasive text balances ethos, pathos and logos.', 'Name the device, then explain its effect on the audience.'],
  },
  {
    id: 'reading-comprehension',
    kind: 'language',
    title: 'Reading Comprehension',
    kicker: 'Strategy',
    subtitle: 'Active reading, inference and annotation for unseen texts.',
    tags: ['reading', 'inference', 'annotation', 'unseen text', 'skimming', 'tone'],
    theme: 'moss',
    art: 'lens',
    intro: 'Unseen passages reward method. These strategies came from timed practice with poems, essays and prose extracts we had never seen before.',
    sections: [
      {
        heading: 'Before, during, after',
        blocks: [
          table(
            ['Stage', 'Strategy'],
            ['Before', 'Read the title, questions and any context. Predict.'],
            ['During', 'Annotate: underline key images, circle shifts in tone, note questions in the margin.'],
            ['After', 'Summarise in one sentence. Identify purpose, audience and tone.']
          ),
        ],
      },
      {
        heading: 'Inference',
        blocks: [
          p('**Inference** is reading what the text implies but does not state. It combines textual evidence with reasoning.'),
          callout('Formula', 'The text says ___. This suggests ___ because ___.'),
          ul('Look for word choices with strong connotations.', 'Notice what is absent or avoided.', 'Pay attention to shifts: in time, tone or perspective.'),
        ],
      },
    ],
    takeaways: ['Annotate actively.', 'Inference = evidence + reasoning.', 'Tone shifts often signal the heart of a passage.'],
  },
];
