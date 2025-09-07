import itertools

def generate_passwords():
    # Génère toutes les combinaisons de chiffres à 4 chiffres (0000 à 9999)
    all_combinations = [''.join(p) for p in itertools.product('0123456789', repeat=4)]
    
    for password in all_combinations:
        # Demande à l'utilisateur si c'est le bon mot de passe
        user_input = input(f"Est-ce que le mot de passe est {password}? (y/n): ")
        
        if user_input.lower() == 'y':
            print(f"Mot de passe trouvé : {password}")
            break
        elif user_input.lower() == 'n':
            continue
        else:
            print("Entrée invalide. Utilisez 'y' pour Oui, 'n' pour Non.")

if __name__ == "__main__":
    generate_passwords()
