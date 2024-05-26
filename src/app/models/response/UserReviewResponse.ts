import { AccountDTO2 } from "../dto/AccountDTO2";
import { ReviewDTO } from "../dto/ReviewDTO";

export class UserReviewResponse {
    user: AccountDTO2;
    review: ReviewDTO;

    constructor(user: AccountDTO2, review: ReviewDTO) {
        this.user = user;
        this.review = review;
    }
}