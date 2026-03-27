package com.cdac.entity;

    import lombok.*;

    import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public class Product implements Serializable {

        @Override
		public String toString() {
			return "Product [id=" + id + ", title=" + title + ", source=" + source + ", cost=" + cost + ", imageUrl="
					+ imageUrl + ", productUrl=" + productUrl + "]";
		}
		private String id; // product ID (Amazon/Flipkart)

        private String title;
        private String source; // Amazon / Flipkart
        private double cost;
        private String imageUrl;
        private String productUrl;
		@Override
		public int hashCode() {
			return Objects.hash(cost, id, imageUrl, productUrl, source, title);
		}
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Product other = (Product) obj;
			return Double.doubleToLongBits(cost) == Double.doubleToLongBits(other.cost) && Objects.equals(id, other.id)
					&& Objects.equals(imageUrl, other.imageUrl) && Objects.equals(productUrl, other.productUrl)
					&& Objects.equals(source, other.source) && Objects.equals(title, other.title);
		}
        
        
    }
