import ohm from 'ohm-js'

const grammars = {
  canadianPostalCode: `ohCanada = canadaChar digit1
    digit1 = canada digit2
    digit2 = canada digit3
    digit3 = " " digit4
    digit4 = canada digit5
    digit5 = canada digit6
    digit6 = digit
    canada =  canadaChar | digit
    canadaChar = ~(digit|"D"|"F"|"I"|"O"|"Q"|"U")any
`,
  visa: `digit1 = "4" digit2
    digit2 = digit digit3
    digit3 = digit digit4
    digit4 = digit digit5
    digit5 = digit digit6
    digit6 = digit digit7
    digit7 = digit digit8
    digit8 = digit digit9
    digit9 = digit digit10
    digit10 = digit digit11
    digit11 = digit digit12
    digit12 = digit digit13
    digit13 = digit digit14	--binary
    	     | digit		--unary
    digit14 = digit digit15
    digit15 = digit digit16
    digit16 = digit
`,
  masterCard: `digit1 = ("51"|"52"|"53"|"54"|"55") digit2 | twos digit4
    twos = "2" ( twos1 | twos2 | twos3 | twos4 | twos5 )
    twos1 = "22" ~"0" digit 
    twos2 = "2" ~("0"|"1"|"2") digit digit
    twos3 = ("3"|"4"|"5"|"6") digit digit
    twos4 = "7" ("0"|"1") digit
    twos5 = "720"
    digit2 = digit digit3
    digit3 = digit digit4
    digit4 = digit digit5
    digit5 = digit digit6
    digit6 = digit digit7
    digit7 = digit digit8
    digit8 = digit digit9
    digit9 = digit digit10
    digit10 = digit digit11
    digit11 = digit digit12
    digit12 = digit digit13
    digit13 = digit digit14
    digit14 = digit digit15
    digit15 = digit`,
  adaFloat: `adanum = based_literal  | decimal_literal
        based_literal = numeral "#" based_numeral("."based_numeral)? "#" (exponent)?
        based_numeral = (extended_digit+ ("_" extended_digit+)*)+
        extended_digit = (digit | "A".."F" | "a".."f")+
		decimal_literal = numeral ("."numeral)? (exponent)?
        exponent = ("E"|"e") ("+"|"-")? numeral
		numeral = (digit+ ("_" digit+)*)+`,
  notThreeEndingInOO: `char1 = char char2					--binary
   			  | char				     	 			--unary
              | ""
   char2 = ("o"|"O") nonO	 			--binary
   			  | ~("o"|"O")char char3 	--other
              | char 								--unary
   nonO = char char+						--binary 
   			  | ~("o"|"O")char				--unary
   char3 = char+
   char = ~digit any`,
  divisibleBy64: `d = (~("000000" end) "0".."1")* "000000"  --long
           | "0" "0"*									--justZeroes`,
  eightThroughTwentyNine: `nummies = ("8"|"9") 		--unary
    				| ("1"|"2")digit 			--ones`,
  mLComment: `braceDelimitedString = "(*" (any~")")* "*)"`,
  notDogDoorDenNoLookAround: `dword = "d" doordog1?									--doordogden
        			| (~"d") any*
        doordog1 = (~"e")"o" doordog2?						--doordog	
        				| (~"o")"e" den									--den
        				|  (~otherletters1)any any*						       --anyword
        den         = "n" any+												--notden
        				| (~"n")any any*								--othernotden
        doordog2 = "g" any+ | "o" door | (~otherletters2)any any*
        otherletters1 = "o" |"e"
        otherletters2 = ("g"|"o")
        door = "r" any+ | (~"r")any any*`,
  notDogDoorDenWithLookAround: `start   = "d" dword						--dword
        			| ~"d" any*					--nondword
          dword = &"oor" door					--door
          			| &"en" den 					--den
          			| &"og" dog 					--dog
          			| ~nonowords any* 							--other
          door = "oor" any+
          den = "en" any+
          dog = "og" any+
          nonowords = "en" | "oor" | "og"`,
};

export function matches(name, string) {
  const grammar = `G {${grammars[name]}}`
  return ohm.grammar(grammar).match(string).succeeded()
}