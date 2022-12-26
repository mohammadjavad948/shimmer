use sha2::{Digest, Sha256};

pub fn hash_token(token: String) -> String {
    let mut hash = Sha256::new();
    hash.update(token.as_bytes());

    format!("{:x}", hash.finalize())
}
