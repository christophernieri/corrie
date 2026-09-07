import type { Character } from './types'

/**
 * Hand-curated roster of Coronation Street characters prominent (or pivotal)
 * between 1998 and 2004. `wikiTitle` is the English Wikipedia page title; minor
 * characters redirect to a section of a yearly "List of ... characters" page,
 * which scripts/fetch-wiki.ts follows.
 */
export const characters: Character[] = [
  // --- Barlows -----------------------------------------------------------
  { id: 'ken-barlow', name: 'Ken Barlow', wikiTitle: 'Ken Barlow', group: 'Barlow', blurb: 'The Street\u2019s resident intellectual, forever falling out with Mike Baldwin.' },
  { id: 'deirdre-barlow', name: 'Deirdre Barlow', wikiTitle: 'Deirdre Barlow', group: 'Barlow', blurb: 'Wrongly jailed in 1998 thanks to fake pilot Jon Lindsay ("Free the Weatherfield One").' },
  { id: 'tracy-barlow', name: 'Tracy Barlow', wikiTitle: 'Tracy Barlow', group: 'Barlow', blurb: 'Deirdre\u2019s daughter; returned in 2002 and sold her baby to Roy and Hayley.' },
  { id: 'peter-barlow', name: 'Peter Barlow', wikiTitle: 'Peter Barlow (Coronation Street)', group: 'Barlow', blurb: 'Ken\u2019s son; committed bigamy with Shelley Unwin and Lucy Richards in 2003.' },
  { id: 'blanche-hunt', name: 'Blanche Hunt', wikiTitle: 'Blanche Hunt', group: 'Barlow', blurb: 'Deirdre\u2019s acid-tongued mother, back on the Street from 1999.' },
  { id: 'adam-barlow', name: 'Adam Barlow', wikiTitle: 'Adam Barlow', group: 'Barlow', blurb: 'Son of Mike Baldwin and Ken\u2019s daughter Susan; arrived 2001 after Susan\u2019s death.' },
  { id: 'jon-lindsay', name: 'Jon Lindsay', wikiTitle: 'Jon Lindsay (Coronation Street)', group: 'Other', blurb: 'Con man posing as an airline pilot who framed Deirdre for fraud.' },

  // --- Baldwins ------------------------------------------------------------
  { id: 'mike-baldwin', name: 'Mike Baldwin', wikiTitle: 'Mike Baldwin (Coronation Street)', group: 'Baldwin', blurb: 'Underworld factory boss and serial husband.' },
  { id: 'alma-baldwin', name: 'Alma Baldwin', wikiTitle: 'Alma Baldwin', group: 'Baldwin', blurb: 'Mike\u2019s third wife; died of cervical cancer in 2001.' },
  { id: 'linda-sykes', name: 'Linda Sykes', wikiTitle: 'Linda Sykes', group: 'Baldwin', blurb: 'Factory machinist who married Mike after an affair with his son.' },
  { id: 'mark-redman', name: 'Mark Redman', wikiTitle: 'Mark Redman', group: 'Baldwin', blurb: 'Mike\u2019s son, who slept with his father\u2019s fianc\u00e9e Linda.' },
  { id: 'eve-sykes', name: 'Eve Sykes', wikiTitle: 'Eve Sykes', group: 'Baldwin', blurb: 'Linda\u2019s mother; bigamously married Fred Elliott in 2001.' },
  { id: 'dean-sykes', name: 'Dean Sykes', wikiTitle: 'Dean Sykes', group: 'Baldwin', blurb: 'Linda\u2019s brother; an armed robber killed during the 2000 Freshco siege.' },
  { id: 'danny-baldwin', name: 'Danny Baldwin', wikiTitle: 'Danny Baldwin', group: 'Baldwin', blurb: 'Mike\u2019s nephew (later revealed as his son), arrived 2004.' },
  { id: 'frankie-baldwin', name: 'Frankie Baldwin', wikiTitle: 'Frankie Baldwin', group: 'Baldwin', blurb: 'Danny\u2019s wife, arrived 2004.' },
  { id: 'jamie-baldwin', name: 'Jamie Baldwin', wikiTitle: 'Jamie Baldwin', group: 'Baldwin', blurb: 'Danny\u2019s son, arrived 2004.' },

  // --- Platts / Roberts ---------------------------------------------------------
  { id: 'gail-platt', name: 'Gail Platt', wikiTitle: 'Gail Platt', group: 'Platt', blurb: 'Weatherfield\u2019s unluckiest wife; married serial killer Richard Hillman in 2002.' },
  { id: 'martin-platt', name: 'Martin Platt', wikiTitle: 'Martin Platt', group: 'Platt', blurb: 'Nurse; his affair with Rebecca Hopkins ended the marriage to Gail.' },
  { id: 'sarah-platt', name: 'Sarah Platt', wikiTitle: 'Sarah Platt', group: 'Platt', blurb: 'Pregnant at 13 in 2000; later engaged to Todd Grimshaw.' },
  { id: 'david-platt', name: 'David Platt', wikiTitle: 'David Platt (Coronation Street)', group: 'Platt', blurb: 'Gail and Martin\u2019s son.' },
  { id: 'nick-tilsley', name: 'Nick Tilsley', wikiTitle: 'Nick Tilsley', group: 'Platt', blurb: 'Gail\u2019s eldest; eloped to Scotland with Leanne Battersby in 1998.' },
  { id: 'audrey-roberts', name: 'Audrey Roberts', wikiTitle: 'Audrey Roberts', group: 'Platt', blurb: 'Gail\u2019s mother; Hillman tried to convince everyone she was senile.' },
  { id: 'alf-roberts', name: 'Alf Roberts', wikiTitle: 'Alf Roberts', group: 'Platt', blurb: 'Audrey\u2019s husband; died on New Year\u2019s Day 1999.' },
  { id: 'richard-hillman', name: 'Richard Hillman', wikiTitle: 'Richard Hillman', group: 'Platt', blurb: 'Financial adviser turned serial killer; drove the Platts into the canal in 2003.' },
  { id: 'patricia-hillman', name: 'Patricia Hillman', wikiTitle: 'Patricia Hillman', group: 'Platt', blurb: 'Richard\u2019s ex-wife, murdered with a shovel in 2002.' },
  { id: 'rebecca-hopkins', name: 'Rebecca Hopkins', wikiTitle: 'Rebecca Hopkins', group: 'Platt', blurb: 'Nurse who had an affair with Martin Platt in 2000.' },
  { id: 'neil-fearns', name: 'Neil Fearns', wikiTitle: 'Neil Fearns', group: 'Platt', blurb: 'Teenage father of Sarah\u2019s baby Bethany.' },
  { id: 'aidan-critchley', name: 'Aidan Critchley', wikiTitle: 'Aidan Critchley', group: 'Platt', blurb: 'Bad-boy boyfriend of Sarah who crashed a stolen car in 2002.' },

  // --- McDonalds -----------------------------------------------------------
  { id: 'steve-mcdonald', name: 'Steve McDonald', wikiTitle: 'Steve McDonald (Coronation Street)', group: 'McDonald', blurb: 'Street Cars boss; married Karen on a bet in 2001.' },
  { id: 'karen-mcdonald', name: 'Karen McDonald', wikiTitle: 'Karen McDonald (Coronation Street)', group: 'McDonald', blurb: 'Fiery factory worker; married Steve twice.' },
  { id: 'liz-mcdonald', name: 'Liz McDonald', wikiTitle: 'Liz McDonald', group: 'McDonald', blurb: 'Steve\u2019s mother; fled the Street with gangster Fraser Henderson in 1998, back 2003.' },
  { id: 'jim-mcdonald', name: 'Jim McDonald', wikiTitle: 'Jim McDonald (Coronation Street)', group: 'McDonald', blurb: 'Steve\u2019s father; jailed for killing Jez Quigley in 2000.' },
  { id: 'andy-mcdonald', name: 'Andy McDonald', wikiTitle: 'Andy McDonald (Coronation Street)', group: 'McDonald', blurb: 'Steve\u2019s twin brother.' },
  { id: 'vikram-desai', name: 'Vikram Desai', wikiTitle: 'Vikram Desai', group: 'McDonald', blurb: 'Steve\u2019s Street Cars partner, 1999\u20132002.' },
  { id: 'fiona-middleton', name: 'Fiona Middleton', wikiTitle: 'Fiona Middleton', group: 'McDonald', blurb: 'Hairdresser who slept with Steve\u2019s father Jim; left 1998.' },

  // --- Duckworths ----------------------------------------------------------
  { id: 'jack-duckworth', name: 'Jack Duckworth', wikiTitle: 'Jack Duckworth', group: 'Duckworth', blurb: 'Pigeon-fancying husband of Vera.' },
  { id: 'vera-duckworth', name: 'Vera Duckworth', wikiTitle: 'Vera Duckworth', group: 'Duckworth', blurb: 'Jack\u2019s long-suffering wife.' },
  { id: 'tyrone-dobbs', name: 'Tyrone Dobbs', wikiTitle: 'Tyrone Dobbs', group: 'Duckworth', blurb: 'The Duckworths\u2019 lodger and surrogate son; mechanic at Websters\u2019.' },
  { id: 'maria-connor', name: 'Maria Sutherland', wikiTitle: 'Maria Connor', group: 'Duckworth', blurb: 'Hairdresser; dated Tyrone, then Nick Tilsley.' },
  { id: 'fiz-brown', name: 'Fiz Brown', wikiTitle: 'Fiz Brown', group: 'Duckworth', blurb: 'Foster child of Roy and Hayley; Tyrone\u2019s girlfriend from 2003.' },
  { id: 'kirk-sutherland', name: 'Kirk Sutherland', wikiTitle: 'Kirk Sutherland', group: 'Duckworth', blurb: 'Maria\u2019s dim but lovable brother.' },

  // --- Websters / Barnes ---------------------------------------------------------
  { id: 'kevin-webster', name: 'Kevin Webster', wikiTitle: 'Kevin Webster', group: 'Webster', blurb: 'Garage owner; affair with Natalie Horrocks wrecked his first marriage to Sally.' },
  { id: 'sally-webster', name: 'Sally Webster', wikiTitle: 'Sally Webster', group: 'Webster', blurb: 'Kevin\u2019s wife (twice); affair with Greg Kelly in 1998.' },
  { id: 'greg-kelly', name: 'Greg Kelly', wikiTitle: 'Greg Kelly (Coronation Street)', group: 'Webster', blurb: 'Les Battersby\u2019s son; conned and abused Sally in 1998.' },
  { id: 'danny-hargreaves', name: 'Danny Hargreaves', wikiTitle: 'Danny Hargreaves', group: 'Webster', blurb: 'Market trader who dated Sally, 1999\u20132000.' },
  { id: 'alison-webster', name: 'Alison Webster', wikiTitle: 'Alison Webster (Coronation Street)', group: 'Webster', blurb: 'Kevin\u2019s second wife; killed herself after their baby died in 2000.' },
  { id: 'natalie-barnes', name: 'Natalie Barnes', wikiTitle: 'Natalie Barnes', group: 'Webster', blurb: 'Rovers landlady; widowed weeks after marrying Des Barnes.' },
  { id: 'des-barnes', name: 'Des Barnes', wikiTitle: 'Des Barnes', group: 'Webster', blurb: 'Bookie killed defending Natalie\u2019s son Tony from drug dealers in 1998.' },
  { id: 'tony-horrocks', name: 'Tony Horrocks', wikiTitle: 'Tony Horrocks', group: 'Webster', blurb: 'Natalie\u2019s drug-addicted son, murdered by Jez Quigley in 1999.' },
  { id: 'vinny-sorrell', name: 'Vinny Sorrell', wikiTitle: 'Vinny Sorrell', group: 'Webster', blurb: 'Natalie\u2019s boyfriend who cheated with her sister Debs Brownlow.' },
  { id: 'jez-quigley', name: 'Jez Quigley', wikiTitle: 'Jez Quigley', group: 'Other', blurb: 'Drug dealer; beaten to death by Jim McDonald in 2000.' },

  // --- Battersbys ----------------------------------------------------------
  { id: 'les-battersby', name: 'Les Battersby', wikiTitle: 'Les Battersby', group: 'Battersby', blurb: 'Neighbour from hell at No. 5.' },
  { id: 'janice-battersby', name: 'Janice Battersby', wikiTitle: 'Janice Battersby', group: 'Battersby', blurb: 'Factory machinist; left Les for Dennis Stringer.' },
  { id: 'leanne-battersby', name: 'Leanne Battersby', wikiTitle: 'Leanne Battersby', group: 'Battersby', blurb: 'Les\u2019s daughter; a teenage marriage to Nick gave way to a turbulent few years.' },
  { id: 'toyah-battersby', name: 'Toyah Battersby', wikiTitle: 'Toyah Battersby', group: 'Battersby', blurb: 'Janice\u2019s daughter; eco-warrior girlfriend of Spider.' },
  { id: 'cilla-battersby-brown', name: 'Cilla Battersby-Brown', wikiTitle: 'Cilla Battersby-Brown', group: 'Battersby', blurb: 'Les\u2019s brash new love from 2003.' },
  { id: 'chesney-brown', name: 'Chesney Brown', wikiTitle: 'Chesney Brown', group: 'Battersby', blurb: 'Cilla\u2019s son.' },
  { id: 'dennis-stringer', name: 'Dennis Stringer', wikiTitle: 'Dennis Stringer', group: 'Battersby', blurb: 'Les\u2019s mate who ran off with Janice; died in a car crash in 2002.' },
  { id: 'spider-nugent', name: 'Spider Nugent', wikiTitle: 'Spider Nugent', group: 'Nugent', blurb: 'Emily\u2019s eco-warrior nephew; Toyah\u2019s boyfriend.' },

  // --- Croppers ------------------------------------------------------------
  { id: 'roy-cropper', name: 'Roy Cropper', wikiTitle: 'Roy Cropper', group: 'Cropper', blurb: 'Caf\u00e9 owner; drugged and duped by Tracy Barlow in 2003.' },
  { id: 'hayley-cropper', name: 'Hayley Cropper', wikiTitle: 'Hayley Cropper', group: 'Cropper', blurb: 'British soap\u2019s first transgender character; married Roy in 1999.' },

  // --- Rovers / Elliott / Peacock --------------------------------------------------
  { id: 'fred-elliott', name: 'Fred Elliott', wikiTitle: 'Fred Elliott', group: 'Peacock', blurb: 'Butcher, I say butcher; Rovers co-owner and hopeless romantic.' },
  { id: 'ashley-peacock', name: 'Ashley Peacock', wikiTitle: 'Ashley Peacock', group: 'Peacock', blurb: 'Fred\u2019s son (raised as nephew); widowed when Hillman killed Maxine.' },
  { id: 'maxine-peacock', name: 'Maxine Peacock', wikiTitle: 'Maxine Peacock', group: 'Peacock', blurb: 'Hairdresser; affair with Dr Matt Ramsden; murdered by Richard Hillman in 2003.' },
  { id: 'matt-ramsden', name: 'Matt Ramsden', wikiTitle: 'Matt Ramsden', group: 'Peacock', blurb: 'GP who fathered Maxine\u2019s son Joshua.' },
  { id: 'claire-peacock', name: 'Claire Casey', wikiTitle: 'Claire Peacock', group: 'Peacock', blurb: 'Joshua\u2019s nanny who married Ashley in 2004.' },
  { id: 'duggie-ferguson', name: 'Duggie Ferguson', wikiTitle: 'Duggie Ferguson', group: 'Rovers', blurb: 'Builder and Rovers co-owner; left to die by Richard Hillman in 2002.' },
  { id: 'shelley-unwin', name: 'Shelley Unwin', wikiTitle: 'Shelley Unwin', group: 'Rovers', blurb: 'Rovers landlady; jilted by bigamist Peter Barlow.' },
  { id: 'bev-unwin', name: 'Bev Unwin', wikiTitle: 'Bev Unwin', group: 'Rovers', blurb: 'Shelley\u2019s mother, arrived 2003.' },
  { id: 'lucy-richards', name: 'Lucy Richards', wikiTitle: 'Lucy Richards', group: 'Rovers', blurb: 'Florist Peter Barlow secretly married in 2003.' },
  { id: 'charlie-stubbs', name: 'Charlie Stubbs', wikiTitle: 'Charlie Stubbs (Coronation Street)', group: 'Rovers', blurb: 'Builder who began controlling Shelley in 2004.' },
  { id: 'ciaran-mccarthy', name: 'Ciaran McCarthy', wikiTitle: 'Ciaran McCarthy', group: 'Rovers', blurb: 'Peter\u2019s Navy mate; Rovers barman and ladies\u2019 man.' },
  { id: 'betty-williams', name: 'Betty Williams', wikiTitle: 'Betty Turpin', group: 'Rovers', blurb: 'Rovers barmaid and hotpot legend.' },
  { id: 'bet-lynch', name: 'Bet Lynch', wikiTitle: 'Bet Lynch', group: 'Rovers', blurb: 'Legendary former landlady; brief returns in 2002 and 2003.' },
  { id: 'rita-sullivan', name: 'Rita Sullivan', wikiTitle: 'Rita Tanner', group: 'Rovers', blurb: 'The Kabin\u2019s owner and Street matriarch.' },

  // --- Alahans -------------------------------------------------------------
  { id: 'dev-alahan', name: 'Dev Alahan', wikiTitle: 'Dev Alahan', group: 'Alahan', blurb: 'Corner-shop owner; affair with Deirdre in 2001.' },
  { id: 'sunita-alahan', name: 'Sunita Parekh', wikiTitle: 'Sunita Alahan', group: 'Alahan', blurb: 'Dev\u2019s shop assistant and on-off love; married him in 2004.' },
  { id: 'geena-gregory', name: 'Geena Gregory', wikiTitle: 'Geena Gregory', group: 'Alahan', blurb: 'Rovers barmaid; Dev\u2019s girlfriend 2001\u20132002.' },
  { id: 'maya-sharma', name: 'Maya Sharma', wikiTitle: 'Maya Sharma', group: 'Alahan', blurb: 'Solicitor who took revenge on Dev and Sunita in 2004.' },

  // --- Grimshaws -----------------------------------------------------------
  { id: 'eileen-grimshaw', name: 'Eileen Grimshaw', wikiTitle: 'Eileen Grimshaw', group: 'Grimshaw', blurb: 'Street Cars dispatcher; mother to Todd and Jason.' },
  { id: 'todd-grimshaw', name: 'Todd Grimshaw', wikiTitle: 'Todd Grimshaw', group: 'Grimshaw', blurb: 'Sarah Platt\u2019s fianc\u00e9 who came out after kissing Karl Foster.' },
  { id: 'jason-grimshaw', name: 'Jason Grimshaw', wikiTitle: 'Jason Grimshaw', group: 'Grimshaw', blurb: 'Builder and Street lothario.' },
  { id: 'karl-foster', name: 'Karl Foster', wikiTitle: 'Karl Foster', group: 'Grimshaw', blurb: 'Nurse whose kiss with Todd blew up Todd\u2019s engagement.' },
  { id: 'candice-stowe', name: 'Candice Stowe', wikiTitle: 'Candice Stowe', group: 'Grimshaw', blurb: 'Sarah\u2019s best friend; dated Jason.' },
  { id: 'sean-tully', name: 'Sean Tully', wikiTitle: 'Sean Tully', group: 'Grimshaw', blurb: 'Factory worker and Eileen\u2019s lodger from 2003.' },

  // --- Harrises ------------------------------------------------------------
  { id: 'tommy-harris', name: 'Tommy Harris', wikiTitle: 'Tommy Harris (Coronation Street)', group: 'Harris', blurb: 'Mechanic in witness protection; furious at Katy\u2019s affair with Martin.' },
  { id: 'angela-harris', name: 'Angela Harris', wikiTitle: 'Angela Harris (Coronation Street)', group: 'Harris', blurb: 'Tommy\u2019s wife.' },
  { id: 'katy-harris', name: 'Katy Harris', wikiTitle: 'Katy Harris', group: 'Harris', blurb: 'Teenager who fell for the much older Martin Platt in 2004.' },
  { id: 'craig-harris', name: 'Craig Harris', wikiTitle: 'Craig Harris (Coronation Street)', group: 'Harris', blurb: 'Goth teenager; Katy\u2019s brother.' },

  // --- Nugent / Cole / Watts ----------------------------------------------------
  { id: 'emily-bishop', name: 'Emily Bishop', wikiTitle: 'Emily Bishop', group: 'Nugent', blurb: 'Gentle widow; survived Richard Hillman\u2019s crowbar attack in 2003.' },
  { id: 'norris-cole', name: 'Norris Cole', wikiTitle: 'Norris Cole', group: 'Nugent', blurb: 'The Kabin\u2019s gossip-in-chief; Emily\u2019s lodger.' },
  { id: 'curly-watts', name: 'Curly Watts', wikiTitle: 'Curly Watts', group: 'Nugent', blurb: 'Supermarket manager; stalked by Anne Malone, married PC Emma Taylor.' },
  { id: 'emma-watts', name: 'Emma Watts', wikiTitle: 'Emma Watts', group: 'Nugent', blurb: 'Police officer who married Curly in 2000.' },
  { id: 'raquel-watts', name: 'Raquel Watts', wikiTitle: 'Raquel Watts', group: 'Nugent', blurb: 'Curly\u2019s ex-wife; returned for one night in 1999 to reveal their daughter.' },
  { id: 'anne-malone', name: 'Anne Malone', wikiTitle: 'Anne Malone', group: 'Nugent', blurb: 'Curly\u2019s obsessive colleague; froze to death in the Freshco freezer in 1998.' },
  { id: 'archie-shuttleworth', name: 'Archie Shuttleworth', wikiTitle: 'Archie Shuttleworth', group: 'Other', blurb: 'Undertaker who courted Blanche Hunt.' },
]

export const characterById = new Map(characters.map((c) => [c.id, c]))
