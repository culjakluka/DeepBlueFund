use anchor_lang::prelude::*;

declare_id!("A5U7FvjGr6MHy1zCmPuYkPqsN93HdXm4DPoVThdoHg9x");

#[program]
pub mod deep_blue_fund {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
