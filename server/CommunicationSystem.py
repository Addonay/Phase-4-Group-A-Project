class Enquiry:
    def __init__(self, sender_name, receiver_name, message):
        self.sender_name = sender_name
        self.receiver_name = receiver_name
        self.message = message

    def __str__(self):
        return f"From: {self.sender_name}\nTo: {self.receiver_name}\nMessage: {self.message}"


class Review:
    def __init__(self, author_name, product_name, rating, comment):
        self.author_name = author_name
        self.product_name = product_name
        self.rating = rating
        self.comment = comment

    def __str__(self):
        return f"Author: {self.author_name}\nProduct: {self.product_name}\nRating: {self.rating}\nComment: {self.comment}"


class CommunicationSystem:
    def __init__(self):
        self.enquiries = []
        self.reviews = []

    def send_enquiry(self, sender_name, receiver_name, message):
        enquiry = Enquiry(sender_name, receiver_name, message)
        self.enquiries.append(enquiry)

    def send_review(self, author_name, product_name, rating, comment):
        review = {
            "author_name": author_name,
            "product_name": product_name,
            "rating": rating,
            "comment": comment,
        }
        self.reviews.append(review)

    def get_enquiries_for_seller(self, seller_name):
        enquiries_for_seller = []
        for enquiry in self.enquiries:
            if enquiry.receiver_name == seller_name:
                enquiries_for_seller.append(enquiry)
        return enquiries_for_seller


    def get_reviews(self):
        return self.reviews
    
    def get_reviews_for_product(self, product_name):
        reviews_for_product = []
        for review in self.reviews:
            if review["product_name"] == product_name:
                reviews_for_product.append(review)
        return reviews_for_product


if __name__ == "__main__":
    communication_system = CommunicationSystem()

    communication_system.send_enquiry("Buyer 1", "Seller 1", "Is the product in stock?")
    communication_system.send_enquiry("Buyer 2", "Seller 2", "What are the shipping options?")

    communication_system.send_review("Buyer 1", "Product A", 5, "Great product!")
    communication_system.send_review("Buyer 2", "Product B", 4, "Good quality.")

    seller_name = "Seller 1"
    product_name = "Product A"

    print(f"enquiries for {seller_name}:")
    enquiries_for_seller = communication_system.get_enquiries_for_seller(seller_name)
    for enquiry in enquiries_for_seller:
        print(enquiry)

    print(f"\nReviews for {product_name}:")
    reviews_for_product = communication_system.get_reviews_for_product(product_name)
    for review in reviews_for_product:
        print(review)
