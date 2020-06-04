
def juego():
    print("\n" * 100)
    palabra = input("Jugador 1, escriba la palabra secreta \n")
    muñeco = """
   ____
  |    | 
  |          
  |        
  |    
  |   
 _|_
|   |______
|          |
|__________|"""

    muñeco_victorioso = """
   ____
  |    | 
  |      
  |             O   O
  |    \O/        *
  |     |       \___/
 _|_    |
|   |__/_\_
|          |
|__________|"""
    muñeco_perdida = """
   ____
  |    | 
  |    O   
  |   /|\     
  |    |      X   X
  |   / \       O
 _|_
|   |______
|          |
|__________|"""
                
    
    try:
        palabra = palabra.split()
        palabra = palabra[0]
        palabra = palabra.upper()
    except:
        print("debes introducir una palabra\n")
        juego()
        return
    print("\nla palabra secreta es \n" + palabra + "\n")
    palabra = palabra.strip()
    confirmar = input("es correcto? Si o No? \n")
    confirmar = confirmar.lower()
    if (confirmar == "si" or confirmar == "s"):
        print("\n" * 100)
        oportunidades = 6
        pizarra = []
        for x in palabra:
            pizarra.append("_")
        while (oportunidades > 0):
            if (oportunidades == 5):
                muñeco = """
   ____
  |    | 
  |    O   
  |        
  |    
  |   
 _|_
|   |______
|          |
|__________|"""
            elif (oportunidades == 4):
                muñeco = """
   ____
  |    | 
  |    O   
  |    |   
  |    |
  |   
 _|_
|   |______
|          |
|__________|"""
            elif (oportunidades == 3):
                muñeco = """
   ____
  |    | 
  |    O   
  |   /|   
  |    |
  |   
 _|_
|   |______
|          |
|__________|"""
            elif (oportunidades == 2):
                muñeco = """
   ____
  |    | 
  |    O   
  |   /|\   
  |    |
  |   
 _|_
|   |______
|          |
|__________|"""
            elif (oportunidades == 1):
                muñeco = """
   ____
  |    | 
  |    O   
  |   /|\   
  |    |
  |   /
 _|_
|   |______
|          |
|__________|"""
            

            if ("_" in pizarra):
                print("\n" * 100)
                print(muñeco + "\n")
                print(' '.join(pizarra) + "\n")
                letra = input("jugador 2 adivine una letra \n")
                letra = letra.upper()
                try:
                    letra = letra[0]
                except:
                    letra = " "
                    
                while (letra == " "):
                    print("\n" * 100)
                    print(muñeco + "\n")
                    print(' '.join(pizarra) + "\n")
                    letra = input("jugador 2 adivine una letra \n")
                    letra = letra.upper()
                    try:
                        letra = letra[0]
                    except:
                        letra = " "
                        
                if (letra in palabra):
                    x = palabra.find(letra)
                    pizarra[x] = letra
                    while (x != -1):
                        y = x
                        y += 1
                        x = palabra.find(letra, y)
                        if (x == -1):
                            break
                        pizarra[x] = letra                   
                    
                else:                    
                    oportunidades -= 1
                    print("\n" * 100)
                    if (oportunidades == 1):
                        print("\nIncorrecto! te queda: " + str(oportunidades) + " oportunidad.\n")
                    elif (oportunidades == 0):
                        print("\nInorrecto! te has quedado sin oportunidades.\n")    
                    else:
                        print("\nIncorrecto! te quedan: " + str(oportunidades) + " oportunidades.\n")
                                        
            else:
                break
        if("_" in pizarra):
            print(muñeco_perdida + "\n")
            print("\nhas perdido\n") 
        else:
            print("\n" * 100)
            print(muñeco_victorioso)
            print("\nhas ganado!\n")
        print("la palabra secreta era: " + palabra + "\n")
        confirmar = input("Quieres jugar otra vez? Si o No? \n")
        confirmar = confirmar.lower()
        if (confirmar == "si" or confirmar == "s"):
            print("")
            juego()
            return
        else:
            print("\ngracias por jugar!\n")
            return        
    else:
        juego()
        return


juego()

