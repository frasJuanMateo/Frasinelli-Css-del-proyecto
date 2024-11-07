//Hecho por Fritz Joaquin y Stasyszyn Nicolas y Maximo Vijarra

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Preguntas.css";

function Preguntas() {
    const [movie, setMovie] = useState(null);
    const [randomMovie, setRandomMovie] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
	const [like, setLike] = useState(false);
	const [dislike, setDislike] = useState(false);
    const iconicMovies = [
		"12 Angry Men",
		"Rear Window",
		"Vertigo",
		"North by Northwest",
		"Psycho",
		"Lawrence of Arabia",
		"To Kill a Mockingbird",
		"Dr. Strangelove",
		"2001: A Space Odyssey",
		"Planet of the Apes",
		"The Godfather",
		"Chinatown",
		"A Clockwork Orange",
		"Jaws",
		"One Flew Over the Cuckoo's Nest",
		"Taxi Driver",
		"Star Wars: A New Hope",
		"Close Encounters of the Third Kind",
		"Alien",
		"Apocalypse Now",
		"Rocky",
		"The Exorcist",
		"Mad Max",
		"Superman",
		"The Shining",
		"Raiders of the Lost Ark",
		"Blade Runner",
		"Scarface",
		"Ghostbusters",
		"The Terminator",
		"Back to the Future",
		"Die Hard",
		"Dead Poets Society",
		"Lethal Weapon",
		"Top Gun",
		"Ferris Bueller's Day Off",
		"Platoon",
		"Full Metal Jacket",
		"Batman",
		"Goodfellas",
		"Home Alone",
		"The Silence of the Lambs",
		"Terminator 2: Judgment Day",
		"Reservoir Dogs",
		"Jurassic Park",
		"Schindler's List",
		"Forrest Gump",
		"Pulp Fiction",
		"The Shawshank Redemption",
		"Braveheart",
		"Heat",
		"Seven",
		"Fargo",
		"Trainspotting",
		"The Big Lebowski",
		"Titanic",
		"The Matrix",
		"Fight Club",
		"The Sixth Sense",
		"American Beauty",
		"Gladiator",
		"Memento",
		"Requiem for a Dream",
		"The Lord of the Rings: The Fellowship of the Ring",
		"A Beautiful Mind",
		"Donnie Darko",
		"The Pianist",
		"City of God",
		"The Lord of the Rings: The Two Towers",
		"Oldboy",
		"Kill Bill: Vol. 1",
		"The Lord of the Rings: The Return of the King",
		"Eternal Sunshine of the Spotless Mind",
		"Sin City",
		"The Departed",
		"Children of Men",
		"No Country for Old Men",
		"There Will Be Blood",
		"The Dark Knight",
		"Slumdog Millionaire",
		"Inglourious Basterds",
		"Avatar",
		"Up",
		"Inception",
		"The Social Network",
		"Black Swan",
		"Toy Story 3",
		"Drive",
		"The Avengers",
		"Django Unchained",
		"Gravity",
		"Her",
		"Frozen",
		"Interstellar",
		"Whiplash",
		"Birdman",
		"Mad Max: Fury Road",
		"The Revenant",
		"The Grand Budapest Hotel",
		"Spotlight",
		"Room",
		"The Hateful Eight",
		"Inside Out",
		"La La Land",
		"Moonlight",
		"Get Out",
		"Logan",
		"Blade Runner 2049",
		"The Shape of Water",
		"Lady Bird",
		"Black Panther",
		"A Star is Born",
		"Bohemian Rhapsody",
		"Spider-Man: Into the Spider-Verse",
		"Parasite",
		"Joker",
		"1917",
		"Once Upon a Time in Hollywood",
		"The Irishman",
		"Ford v Ferrari",
		"Tenet",
		"Sound of Metal",
		"Nomadland",
		"The Trial of the Chicago 7",
		"Soul",
		"Dune",
		"No Time to Die",
		"Spider-Man: No Way Home",
		"Licorice Pizza",
		"The Batman",
		"Top Gun: Maverick",
		"Everything Everywhere All at Once",
		"Doctor Strange in the Multiverse of Madness",
		"Elvis",
		"Avatar: The Way of Water",
		"The Fabelmans",
		"The Whale",
		"Babylon",
		"Tár",
		"Oppenheimer",
		"Barbie",
		"Asteroid City",
		"Past Lives",
		"Mission: Impossible - Dead Reckoning Part One",
		"John Wick: Chapter 4",
		"Guardians of the Galaxy Vol. 3",
		"Spider-Man: Across the Spider-Verse",
		"The Flash",
		"Indiana Jones and the Dial of Destiny",
		"Shazam! Fury of the Gods",
		"M3GAN",
		"Creed III",
		"Scream VI",
		"Ant-Man and the Wasp: Quantumania",
		"Fast X",
		"The Super Mario Bros. Movie",
		"Transformers: Rise of the Beasts",
		"Evil Dead Rise",
		"The Little Mermaid",
		"The Hunger Games: Mockingjay",
		"The Witch",
		"Arrival",
		"Deadpool",
		"Zootopia",
		"Moana",
		"Captain Marvel",
		"Wonder Woman",
		"It",
		"A Quiet Place",
		"Hereditary",
		"Midsommar",
		"The Invisible Man",
		"Knives Out",
		"Jojo Rabbit",
		"Marriage Story",
		"The Lighthouse",
		"Ford v Ferrari",
		"Minari",
		"The Father",
		"The Banshees of Inisherin",
		"Triangle of Sadness",
		"Aftersun",
		"The Menu",
		"Raya and the Last Dragon",
		"Luca",
		"Encanto",
		"The French Dispatch",
		"The Northman",
		"Tick, Tick... Boom!",
		"Don't Look Up",
		"The Unbearable Weight of Massive Talent",
		"Turning Red",
		"The Woman King",
		"She Said",
		"Armageddon Time",
		"Amsterdam",
		"Decision to Leave",
		"White Noise",
		"Smile",
		"The Black Phone",
		"Prey",
		"Hustle",
		"Emancipation",
		"Beau Is Afraid",
		"Nope",
		"Bullet Train",
		"Till",
		"Glass Onion",
		"Vengeance",
		"The Good Nurse",
		"A Man Called Otto",
		"Empire of Light",
		"Women Talking",
		"Firestarter",
		"Sunset Boulevard",
		"A Streetcar Named Desire",
		"High Noon",
		"Roman Holiday",
		"Singin' in the Rain",
		"Shane",
		"The Bridge on the River Kwai",
		"Some Like It Hot",
		"Ben-Hur",
		"The Magnificent Seven",
		"West Side Story",
		"Dr. No",
		"From Russia with Love",
		"Goldfinger",
		"My Fair Lady",
		"The Sound of Music",
		"A Man for All Seasons",
		"The Graduate",
		"Bonnie and Clyde",
		"The Lion in Winter",
		"Midnight Cowboy",
		"Easy Rider",
		"Patton",
		"Love Story",
		"Dirty Harry",
		"Deliverance",
		"The Last Picture Show",
		"The Godfather Part II",
		"Dog Day Afternoon",
		"Monty Python and the Holy Grail",
		"All the President's Men",
		"Network",
		"The Omen",
		"The Deer Hunter",
		"Halloween",
		"Grease",
		"Kramer vs. Kramer",
		"The Warriors",
		"Saturday Night Fever",
		"The Elephant Man",
		"The Blues Brothers",
		"The Long Good Friday",
		"Escape from New York",
		"Poltergeist",
		"First Blood",
		"An Officer and a Gentleman",
		"The Right Stuff",
		"Scarface",
		"Sixteen Candles",
		"The Breakfast Club",
		"The Goonies",
		"Stand by Me",
		"Blue Velvet",
		"RoboCop",
		"The Untouchables",
		"Planes, Trains and Automobiles",
		"Big",
		"Coming to America",
		"Beetlejuice",
		"When Harry Met Sally",
		"Glory",
		"Misery",
		"Good Morning, Vietnam",
		"Field of Dreams",
		"Total Recall",
		"Dances with Wolves",
		"Edward Scissorhands",
		"Point Break",
		"Thelma & Louise",
		"A League of Their Own",
		"Unforgiven",
		"Aladdin",
		"True Romance",
		"The Fugitive",
		"Speed",
		"The Crow",
		"Legends of the Fall",
		"Apollo 13",
		"The Usual Suspects",
		"Braveheart",
		"Jerry Maguire",
		"Scream",
		"L.A. Confidential",
		"The Game",
		"As Good as It Gets",
		"Saving Private Ryan",
		"The Thin Red Line",
		"The Sixth Sense",
		"The Blair Witch Project",
		"The Iron Giant",
		"Almost Famous",
		"Gladiator",
		"Crouching Tiger, Hidden Dragon",
		"O Brother, Where Art Thou?",
		"The Royal Tenenbaums",
		"Mulholland Drive",
		"Catch Me If You Can",
		"Signs",
		"Old School",
		"Kill Bill: Vol. 2",
		"Mean Girls",
		"Shaun of the Dead",
		"Eternal Sunshine of the Spotless Mind",
		"The Incredibles",
		"The Notebook",
		"Million Dollar Baby",
		"The 40-Year-Old Virgin",
		"Walk the Line",
		"Pan's Labyrinth",
		"The Pursuit of Happyness",
		"Borat",
		"300",
		"Superbad",
		"No Country for Old Men",
		"The Diving Bell and the Butterfly",
		"Michael Clayton",
		"Zodiac",
		"Into the Wild",
		"Gran Torino",
		"Slumdog Millionaire",
		"Up in the Air",
		"District 9",
		"Inglourious Basterds",
		"The Hangover",
		"Crazy Heart",
		"Toy Story 3",
		"127 Hours",
		"True Grit",
		"Midnight in Paris",
		"Drive",
		"Warrior",
		"The Artist",
		"The Help",
		"Moneyball",
		"The Descendants",
		"The Intouchables",
		"Skyfall",
		"Looper",
		"Silver Linings Playbook",
		"The Conjuring",
		"Rush",
		"Prisoners",
		"12 Years a Slave",
		"Dallas Buyers Club",
		"The Grand Budapest Hotel",
		"Whiplash",
		"Birdman",
		"Nightcrawler",
		"Inside Out",
		"Spotlight",
		"Room",
		"The Big Short",
		"The Revenant",
		"Hell or High Water",
		"Arrival",
		"Manchester by the Sea",
		"La La Land",
		"Moonlight",
		"Lady Bird",
		"A Quiet Place",
		"The Shape of Water",
		"Dunkirk",
		"Three Billboards Outside Ebbing, Missouri",
		"Call Me by Your Name",
		"Bohemian Rhapsody",
		"Roma",
		"First Man",
		"Green Book",
		"BlacKkKlansman",
		"A Star Is Born",
		"Parasite",
		"Joker",
		"Marriage Story",
		"The Irishman",
		"1917",
		"Jojo Rabbit",
		"Once Upon a Time in Hollywood",
		"Ford v Ferrari",
		"The Lighthouse",
		"Soul",
		"Minari",
		"Nomadland",
		"Sound of Metal",
		"Promising Young Woman",
		"The Trial of the Chicago 7",
		"The Father",
		"Shang-Chi and the Legend of the Ten Rings",
		"The Green Knight",
		"Dune",
		"The Power of the Dog",
		"Don't Look Up",
		"Licorice Pizza",
		"Coda",
		"Belfast",
		"No Time to Die",
		"Spider-Man: No Way Home",
		"The French Dispatch",
		"West Side Story",
		"Everything Everywhere All at Once",
		"Top Gun: Maverick",
		"Doctor Strange in the Multiverse of Madness",
		"The Banshees of Inisherin",
		"Tár",
		"The Whale",
		"Elvis",
		"Babylon",
		"All About Eve",
		"Rashomon",
		"The African Queen",
		"On the Waterfront",
		"Rebel Without a Cause",
		"Giant",
		"12 Angry Men",
		"Vertigo",
		"North by Northwest",
		"Anatomy of a Murder",
		"Pillow Talk",
		"Spartacus",
		"Judgment at Nuremberg",
		"The Hustler",
		"Cape Fear",
		"Lolita",
		"The Manchurian Candidate",
		"The Birds",
		"Charade",
		"The Great Escape",
		"Zorba the Greek",
		"Doctor Zhivago",
		"The Spy Who Came in from the Cold",
		"The Professionals",
		"Who's Afraid of Virginia Woolf?",
		"Cool Hand Luke",
		"The Graduate",
		"The Dirty Dozen",
		"The Thomas Crown Affair",
		"The Odd Couple",
		"Butch Cassidy and the Sundance Kid",
		"The Wild Bunch",
		"Midnight Cowboy",
		"Papillon",
		"Serpico",
		"The Conversation",
		"Young Frankenstein",
		"Blazing Saddles",
		"The Taking of Pelham One Two Three",
		"One Flew Over the Cuckoo's Nest",
		"Dog Day Afternoon",
		"Rocky",
		"Marathon Man",
		"The Outlaw Josey Wales",
		"Carrie",
		"Close Encounters of the Third Kind",
		"Annie Hall",
		"Halloween",
		"Superman",
		"Manhattan",
		"Alien",
		"The Jerk",
		"Mad Max",
		"Ordinary People",
		"The Blues Brothers",
		"Raging Bull",
		"The Shining",
		"The Elephant Man",
		"Fame",
		"Das Boot",
		"Tootsie",
		"Conan the Barbarian",
		"Blade Runner",
		"The King of Comedy",
		"The Right Stuff",
		"Scarface",
		"A Christmas Story",
		"Amadeus",
		"The Killing Fields",
		"A Passage to India",
		"The Color Purple",
		"Witness",
		"The Fly",
		"Predator",
		"Fatal Attraction",
		"Broadcast News",
		"The Princess Bride",
		"Rain Man",
		"Big",
		"Do the Right Thing",
		"Driving Miss Daisy",
		"Dead Poets Society",
		"Field of Dreams",
		"Born on the Fourth of July",
		"Ghost",
		"Dances with Wolves",
		"Cape Fear",
		"Basic Instinct",
		"A Few Good Men",
		"In the Line of Fire",
		"Philadelphia",
		"The Remains of the Day",
		"The Client",
		"Natural Born Killers",
		"The Birdcage",
		"Donnie Brasco",
		"The Fifth Element",
		"Good Will Hunting",
		"Jackie Brown",
		"Boogie Nights",
		"Armageddon",
		"The Truman Show",
		"American Pie",
		"Magnolia",
		"American History X",
		"The Green Mile",
		"Coyote Ugly",
		"Meet the Parents",
		"Requiem for a Dream",
		"A Beautiful Mind",
		"Ocean's Eleven",
		"Black Hawk Down",
		"Mulholland Drive",
		"The Bourne Identity",
		"Catch Me If You Can",
		"Pirates of the Caribbean: The Curse of the Black Pearl",
		"Lost in Translation",
		"Master and Commander: The Far Side of the World",
		"The Aviator",
		"Sideways",
		"Walk the Line",
		"V for Vendetta",
		"Children of Men",
		"Casino Royale",
		"Eastern Promises",
		"No Country for Old Men",
		"Atonement",
		"Gran Torino",
		"Let the Right One In",
		"Sherlock Holmes",
		"A Serious Man",
		"The Road",
		"Inception",
		"Shutter Island",
		"Black Swan",
		"True Grit",
		"The Fighter",
		"50/50",
		"The Descendants",
		"Tinker Tailor Soldier Spy",
		"The Girl with the Dragon Tattoo",
		"The Dark Knight Rises",
		"Argo",
		"Lincoln",
		"Zero Dark Thirty",
		"Looper",
		"Prisoners",
		"Her",
		"Rush",
		"Interstellar",
		"Ex Machina",
		"Spotlight",
		"Bridge of Spies",
		"The Hateful Eight",
		"Room",
		"The Big Short",
		"The Martian",
		"Brooklyn",
		"Arrival",
		"Lion",
		"Hacksaw Ridge",
		"The Salesman",
		"Get Out",
		"Lady Bird",
		"Three Billboards Outside Ebbing, Missouri",
		"The Post",
		"I, Tonya",
		"Phantom Thread",
		"Roma",
		"A Star Is Born",
		"Vice",
		"BlacKkKlansman",
		"Green Book",
		"Bohemian Rhapsody",
		"Ford v Ferrari",
		"Joker",
		"Parasite",
		"1917",
		"Marriage Story",
		"Mank",
		"Promising Young Woman",
		"The Father",
		"Minari",
		"Nomadland",
		"Sound of Metal",
		"The Trial of the Chicago 7",
		"No Time to Die",
		"The Power of the Dog",
		"Dune",
		"Belfast",
		"King Richard",
		"Licorice Pizza",
		"Coda",
		"The Batman",
		"Turning Red",
		"Elvis",
		"Top Gun: Maverick",
		"The Fabelmans",
		"The Banshees of Inisherin",
		"Avatar: The Way of Water",
    ];

    const RandomMovie = () => {
        const position = Math.floor(Math.random() * iconicMovies.length);
        const selectedMovie = iconicMovies[position];
        setRandomMovie(selectedMovie);
    };

	const HandleClickLike = () => {
		setLike(true);
		setTimeout(()=>setLike(false), 1000);
	}
	const HandleClickDislike = () => {
		setDislike(true);
		setTimeout(()=>setDislike(false),1000);
	}
    useEffect(() => {
        RandomMovie(); 
    }, []);

    useEffect(() => {
        if (randomMovie) {
            setLoader(true);
            axios
                .get(`https://www.omdbapi.com/?t=${randomMovie}&apikey=e5b17a6c`)
                .then((res) => setMovie(res.data))
                .catch((err) => console.error("Error fetching movie", err))
                .finally(() => setLoader(false));
        }
    }, [randomMovie]);

    const goToDescription = () => {
        navigate("/Descripcion", { state: { movie } });
    };

    return (
        <>
            <div className="grilla">
                <div className="info-peli">
                    <center>
                        <h1>Movie Randomizer</h1>
                        <main>
                            {movie && movie.Title ? (
                                <div key={movie.imdbID}>
                                    <h2>{movie.Title}</h2>
                                    <p>{movie.Plot}</p>
                                </div>
                            ) : (
                                <p>No movie selected</p>
                            )}
                        </main>
                        <button onClick={()=>{RandomMovie(); HandleClickLike()}} className={`my-button ${like ? "like": ""}`}>❤️</button>
                        <button onClick={goToDescription} className="my-button">Watch Now 🎬</button>
                        <button onClick={()=>{RandomMovie(); HandleClickDislike()}} className={`my-button ${dislike ? "dislike": ""}`}>❌</button>
                    </center>
                </div>
                <div className="img-peli">
                    <center>
                        <main>
                            {loader ? (
                                <div className="loader	" />
                            ) : movie && movie.Poster ? (
                                <div key={movie.imdbID} className="imagen">
                                    <img className="img-poster" src={movie.Poster} alt={movie.Title} />
                                </div>
                            ) : (
                                <p>No movie selected</p>
                            )}
                        </main>
                    </center>
                </div>
            </div>
        </>
    );
}

export default Preguntas;
