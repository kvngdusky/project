// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];

  return dnaBases[Math.floor(Math.random() * dnaBases.length)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];

  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }

  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];

      let newBase;

      do {
        newBase = returnRandBase();
      } while (newBase === currentBase);

      this.dna[randomIndex] = newBase;

      return this.dna;
    },

    compareDNA(otherPAequor) {
      let matchingBases = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          matchingBases++;
        }
      }

      const percentage = (matchingBases / this.dna.length) * 100;

      console.log(
        `Specimen ${this.specimenNum} and specimen ${
          otherPAequor.specimenNum
        } have ${percentage.toFixed(2)}% DNA in common.`
      );

      // Allows us to use the percentage later
      return percentage;
    },

    willLikelySurvive() {
      let counter = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          counter++;
        }
      }

      const percentage = (counter / this.dna.length) * 100;

      return percentage >= 60;
    },

    complementStrand() {
      return this.dna.map((base) => {
        switch (base) {
          case "A":
            return "T";
          case "T":
            return "A";
          case "C":
            return "G";
          case "G":
            return "C";
          default:
            return base;
        }
      });
    },
  };
};

// Create 30 specimens that are likely to survive
const pAequorArray = [];
let specimenNum = 1;

while (pAequorArray.length < 30) {
  const specimen = pAequorFactory(specimenNum, mockUpStrand());

  if (specimen.willLikelySurvive()) {
    pAequorArray.push(specimen);
  }

  specimenNum++;
}

// Find the two most related specimens
let highestMatch = -1;
let firstSpecimen;
let secondSpecimen;

for (let i = 0; i < pAequorArray.length; i++) {
  for (let j = i + 1; j < pAequorArray.length; j++) {
    const currentMatch = pAequorArray[i].compareDNA(pAequorArray[j]);

    if (currentMatch > highestMatch) {
      highestMatch = currentMatch;
      firstSpecimen = pAequorArray[i];
      secondSpecimen = pAequorArray[j];
    }
  }
}

console.log(
  `The two most related specimens are specimen ${
    firstSpecimen.specimenNum
  } and specimen ${
    secondSpecimen.specimenNum
  }, with ${highestMatch.toFixed(2)}% DNA in common.`
);