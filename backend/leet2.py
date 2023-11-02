s = "abciiidef"

k = 3

vowels = ["a", "e", "i", "o", "u"]

tests = len(s) - k + 1


maxVowels = 0

for test in range(tests):
    curVowels = 0
    if test == 0:
        curSub = s[:k]
    else:
        curSub += s[k+test-1]
        curSub = curSub[1:]

    if maxVowels == k:
        break
    
    for char in curSub:
        if char in vowels:
            curVowels += 1
    if curVowels > maxVowels:
        maxVowels = curVowels


print(maxVowels)    