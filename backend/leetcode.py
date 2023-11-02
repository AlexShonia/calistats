s = "novowels"

k = 1

vowels = ["a", "e", "i", "o", "u"]

tests = len(s) - k + 1

curVowels = 0
maxVowels = 0


for test in range(tests):

    if test == 0:
        for char in s[:k]:
            if char in vowels:
                curVowels += 1
    else:
        if s[k+test-1] in vowels:
            curVowels += 1
        if s[test-1] in vowels:
            curVowels -= 1
   
    if curVowels == k:
        maxVowels = curVowels
        break
    
    if curVowels > maxVowels:
        maxVowels = curVowels

print(maxVowels)    