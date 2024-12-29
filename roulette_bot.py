import random
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackContext, CallbackQueryHandler, ContextTypes

# Ton token d'API
TOKEN = "7250179353:AAH-adrLkCrXwX5-S_RxVWoYr-HlM2E8hvg"

# Simuler une base de données des utilisateurs avec leur solde
users_balance = {}

# Commande start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Bienvenue sur la Roulette TRX ! 🎰 Tape /help pour découvrir les commandes disponibles."
    )

# Commande help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Commandes disponibles :\n/start - Démarrer le bot\n/help - Afficher l'aide\n/roulette - Jouer à la roulette"
    )

# Commande pour afficher la roulette
async def roulette(update: Update, context: CallbackContext) -> None:
    user_id = update.effective_user.id

    # Vérifier si l'utilisateur a un compte
    if user_id not in users_balance:
        users_balance[user_id] = 100  # Solde initial

    balance = users_balance[user_id]

    # Vérifier si le solde est suffisant
    if balance < 10:
        await update.message.reply_text(
            "Tu n'as pas assez de TRX pour jouer. Recharge ton compte ! 💸"
        )
        return

    # Proposer de jouer
    keyboard = [
        [InlineKeyboardButton("🎰 Tourner (10 TRX)", callback_data="spin")],
        [InlineKeyboardButton("Annuler", callback_data="cancel")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        f"Ton solde : {balance} TRX\n\n"
        "Clique sur le bouton pour faire tourner la roulette.",
        reply_markup=reply_markup,
    )

# Gérer le tirage de la roulette
async def spin_roulette(update: Update, context: CallbackContext) -> None:
    query = update.callback_query
    user_id = query.from_user.id

    # Déduire le coût du tirage
    users_balance[user_id] -= 10

    # Résultats possibles (multiplicateurs)
    multipliers = [0, 1, 2, 5, 10, 100, 1000]
    result = random.choices(multipliers, weights=[50, 25, 15, 5, 3, 1, 0.1], k=1)[0]

    # Calculer les gains
    winnings = 10 * result
    users_balance[user_id] += winnings

    # Envoyer le résultat
    await query.edit_message_text(
        f"🎉 La roulette tourne... Résultat : x{result} !\n\n"
        f"Tu gagnes {winnings} TRX. Ton nouveau solde : {users_balance[user_id]} TRX."
    )

# Configuration de l'application
app = ApplicationBuilder().token(TOKEN).build()

# Ajout des commandes
app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("help", help_command))
app.add_handler(CommandHandler("roulette", roulette))

# Ajout des handlers pour les actions sur la roulette
app.add_handler(CallbackQueryHandler(spin_roulette, pattern="^spin$"))

if __name__ == "__main__":
    print("Le bot est en cours d'exécution...")
    app.run_polling()
