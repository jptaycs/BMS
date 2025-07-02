use rusqlite::{Connection, Result};

pub fn establish_connection() -> Result<Connection>{
    Connection::open("bms.db")
}
