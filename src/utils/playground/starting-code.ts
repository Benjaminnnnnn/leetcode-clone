import { LanguageType } from "../types/languages";

const startingCodeMap: { [key in LanguageType]: string } = {
  [LanguageType.JAVASCRIPT]: `
function main() {
    console.log("Hello World");
}

main()
    `,
  [LanguageType.PYTHON]: `
def main():
    print("Hello World")

if __name__ == "__main__":
    main();
    `,
};

export default startingCodeMap;
