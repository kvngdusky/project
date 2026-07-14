// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
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
        `Specimen ${this.specimenNum} and specimen ${otherPAequor.specimenNum} have ${percentage}% DNA in common.`,
      );
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
        }
      });
    },
  };
};

const pAequorArray = [];
let specimenNum = 1;

while (pAequorArray.length < 30) {
  const specimen = pAequorFactory(specimenNum, mockUpStrand());

  if (specimen.willLikelySurvive()) {
    pAequorArray.push(specimen);
  }
  specimenNum++;
}
